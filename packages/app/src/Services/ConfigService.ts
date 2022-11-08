import { joinUrl } from '../Utils/url';

class ConfigService {
    static env = process.env.NODE_ENV;
    static isProd = ConfigService.env === 'production';
    static isDev = !ConfigService.isProd;

    static appName = 'RoiD Assignment';
    static baseUrl = window.location.origin;
    static apiUrl = joinUrl(ConfigService.baseUrl, 'api');
}

export default ConfigService;
