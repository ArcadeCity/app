const extraNodeModules = require('node-libs-react-native')
const { getDefaultConfig } = require('expo/metro-config')
const projectRoot = __dirname
const config = getDefaultConfig(projectRoot)

config.resolver.extraNodeModules = extraNodeModules
config.resolver.assetExts.push('glb', 'gltf')

module.exports = config
