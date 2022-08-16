const extraNodeModules = require('node-libs-react-native')
const { getDefaultConfig } = require('expo/metro-config')
const projectRoot = __dirname
const config = getDefaultConfig(projectRoot)

config.resolver.extraNodeModules = extraNodeModules

module.exports = config
