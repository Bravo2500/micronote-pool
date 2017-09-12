var fs = require('fs');

var configFile = (function(){
    for (var i = 0; i < process.argv.length; i++){
        if (process.argv[i].indexOf('-config=') === 0)
            return process.argv[i].split('=')[1];
    }
    return 'config.json';
})();


try {
    global.config = JSON.parse(fs.readFileSync(configFile));
}
catch(e){
    console.error('Failed to read config file ' + configFile + '\n\n' + e);
    return;
}

var donationAddresses = {
    devDonation: {
        XUNC: 'TvyAianpheRVhYY54FBQ4g4bzmEAnr4AURtzLnQgPQC6CbTDEC7o4ow7cYThNDFxh1iD1V8Vx2TBvdXpZsV6AqmN2AvsfL9Go'
    },
    coreDevDonation: {
        XUNC: 'Tvx4ACR3rvm55M8qVcMERdVXs2agg7W9vBgcFCCcddpKAMdb5TsT4WA9ne4hcFj9JENAezkxE3Q2M1RM4xme9Zm21ugucYkv7',
    },
    extraFeaturesDevDonation: {
        XUNC: '',
    }
};

global.donations = {};

for(var configOption in donationAddresses) {
    var percent = config.blockUnlocker[configOption];
    var wallet = donationAddresses[configOption][config.symbol];
    if(percent && wallet) {
        global.donations[wallet] = percent;
    }
}

global.version = "v0.0.1";
