module.exports = extendComponents

function extendComponents(componentPaths, logger) {
  var components = {}
    , output = []
  // If an already named component is found then it will overwrite previous loaded components
  componentPaths.forEach(function (path) {
    var component = require(path)
      , name = Object.keys(component())[0]
    if (components[name]) {
        logger.info('Over writing component with custom ‘' + name + '’ from ' + path)
    }
    components[name] = component
  })

  Object.keys(components).map(function(component) {
    output.push(components[component])
  })

  return output
}