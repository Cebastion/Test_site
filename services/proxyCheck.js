import geoip from 'geoip-lite';

const DATACENTER_ASN_KEYWORDS = ['amazon', 'google cloud', 'digitalocean', 'ovh', 'hetzner', 'microsoft azure', 'linode', 'vultr', 'cloudflare'];

export const checkDatacenterIP = (ip) => {
    const geo = geoip.lookup(ip);
    if (!geo) return { isDatacenter: false, org: null };
    const org = (geo.org || '').toLowerCase();
    const isDatacenter = DATACENTER_ASN_KEYWORDS.some(k => org.includes(k));
    return { isDatacenter, org: geo.org, country: geo.country, city: geo.city };
};

export const checkVPN = async (ip) => {
    try {
        const res = await fetch(`https://proxycheck.io/v2/${ip}?vpn=1&asn=1`);
        const json = await res.json();
        return json[ip] || {};
    } catch {
        return {};
    }
};