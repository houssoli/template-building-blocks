
var fs = require('fs');
var _ = require('../lodashMixins.js');

function merge(settings) {
    return settings;
}

function process(parent) {
    let instance = {
        "resourceGroup": parent.resourceGroup,
        "subscription": parent.subscription,
        "name": "",
        "properties": {
            "publicIPAllocationMethod": ""
        }
    };

    return _.transform(_.castArray(instance), (result, n) => {
        instance.name = parent.name.concat('-pip');
        instance.properties.publicIPAllocationMethod = parent.publicIPAllocationMethod;

        if (parent.hasOwnProperty("domainNameLabelPrefix") && !_.isNullOrWhitespace(parent.domainNameLabelPrefix)) {
            instance.properties.dnsSettings = {};
            instance.properties.dnsSettings.domainNameLabel = parent.domainNameLabelPrefix;
        }
        result.push(instance);
        return result;
    }, []);
}

exports.processPipSettings = process;
exports.mergeWithDefaults = merge;
