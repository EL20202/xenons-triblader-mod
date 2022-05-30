ig.module("impact.feature.bgm.bgm-melly-mod")
  .requires("impact.feature.bgm.bgm")
  .defines(function () {
    ig.merge(ig.BGM_TRACK_LIST, {
      meatboySalt: {
        path: "media/bgm/meatboy-salt.ogg",
        loopEnd: 82.521,
        volume: 1.0,
        introPath: "media/bgm/meatboy-salt-i.ogg",
        introEnd: 7.716
      },
      meatboyForest: {
        path: "media/bgm/meatboy-forest.ogg",
        loopEnd: 78.129,
        volume: 1.0,
        introPath: "media/bgm/meatboy-forest-i.ogg",
        introEnd: 44.417
      },
      "meatboyHell": {
        path: "media/bgm/meatboy-hell.ogg",
        loopEnd: 78.000,
        volume: 0.8
      },
      meatboyRapture: {
        path: "media/bgm/meatboy-rapture.ogg",
        loopEnd: 84.410,
        volume: 1.0,
        introPath: "media/bgm/meatboy-rapture-i.ogg",
        introEnd: 3.512
      },
      "meatboyCotton": {
        path: "media/bgm/meatboy-cotton.ogg",
        loopEnd: 82.096,
        volume: 1.0
      },
      "scarpsCave": {
        path: "media/bgm/scarps-cave.ogg",
        loopEnd: 285.513,
        volume: 1.0
      },
      unholyInsurgencyLong: {
        path: "media/bgm/unholy-insurgency.ogg",
        loopEnd: 142.687,
        volume: 0.6,
        introPath: "media/bgm/unholy-insurgency-i-long.ogg",
        introEnd: 31.936
      },
      unholyInsurgencyMed: {
        path: "media/bgm/unholy-insurgency.ogg",
        loopEnd: 142.687,
        volume: 0.6,
        introPath: "media/bgm/unholy-insurgency-i-med.ogg",
        introEnd: 7.693
      },
      unholyInsurgencyShort: {
        path: "media/bgm/unholy-insurgency.ogg",
        loopEnd: 142.687,
        volume: 0.6,
        introPath: "media/bgm/unholy-insurgency-i-short.ogg",
        introEnd: 0.429
      },
      alight: {
        path: "media/bgm/alight.ogg",
        loopEnd: 157.26,
        volume: 0.8,
        introPath: "media/bgm/alight-i.ogg",
        introEnd: 29.970
      },
      rubyDelusions: {
        path: "media/bgm/ruby-delusions.ogg",
        loopEnd: 64.018,
        volume: 0.8,
        introPath: "media/bgm/ruby-delusions-i.ogg",
        introEnd: 3.193
      },
      galacticBattle: {
        path: "media/bgm/galactic-battle.ogg",
        loopEnd: 62.255,
        volume: 0.8,
        introPath: "media/bgm/galactic-battle-i.ogg",
        introEnd: 12.924
      },
      brawlBoss: {
        path: "media/bgm/brawl-boss.ogg",
        loopEnd: 110.781,
        volume: 0.8,
        introPath: "media/bgm/brawl-boss-i.ogg",
        introEnd: 1.480
      },
      meatboySlugger: {
        path: "media/bgm/meatboy-slugger.ogg",
        loopEnd: 136.775,
        volume: 0.7,
        introPath: "media/bgm/meatboy-slugger-i.ogg",
        introEnd: 47.562
      },
      valentine: {
        path: "media/bgm/valentine.ogg",
        loopEnd: 105.184,
        volume: 0.8,
        introPath: "media/bgm/valentine-i.ogg",
        introEnd: 29.458
      },
      trianglePrep: {
        path: "media/bgm/triangle-prep.ogg",
        loopEnd: 94.128,
        volume: 0.8,
        introPath: "media/bgm/triangle-prep-i.ogg",
        introEnd: 2.801
      },
      triangleDestinyFull: {
        path: "media/bgm/triangle-destiny.ogg",
        loopEnd: 208.666,
        volume: 1.0,
        introPath: "media/bgm/triangle-destiny-i-full.ogg",
        introEnd: 35.746
      },
      triangleDestinyMed: {
        path: "media/bgm/triangle-destiny.ogg",
        loopEnd: 208.666,
        volume: 1.0,
        introPath: "media/bgm/triangle-destiny-i-med.ogg",
        introEnd: 17.661
      },
      contract: {
      	introPath: "media/bgm/contract-i.ogg",
	    path: "media/bgm/contract.ogg",
	    introEnd: 9.849,
	    loopEnd: 224.515, 
	    volume: 1.0
	  }
    });

    ig.merge(ig.BGM_DEFAULT_TRACKS, {
      scarpsCaveArea: {
        field: {
          track: "scarpsCave",
          volume: 0.9,
        },
        battle: {
          track: "fieldBattle",
          volume: 0.7,
        },
		rankBattle: {
			track: "fieldBattle",
			volume: 0.7
		},
		sRankBattle: {
			track: "fieldBattle",
			volume: 0.7
		}
      }

    });
  });