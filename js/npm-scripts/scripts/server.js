import {exec} from "shelljs";
const isWindows = process.platform === "win32";
const environment = isWindows ? "var windows compatible" : "var unix compatible"
const {npm_package_version: version, npm_package_config_port: port} = process.env;

exec(`cross-var http-server public/${version} -p ${port}`, {async: true});
exec(`cross-var opn http://localhost:${port}`)


