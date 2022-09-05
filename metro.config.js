const extraNodeModules = require('node-libs-react-native')
const { getDefaultConfig } = require('expo/metro-config')
const projectRoot = __dirname
const config = getDefaultConfig(projectRoot)

config.resolver.extraNodeModules = extraNodeModules
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs']
config.resolver.assetExts = ['glb', 'gltf', 'png', 'jpg']

module.exports = config
