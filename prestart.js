import "./js/bgm/custom-bgm.js";

sc.PARTY_OPTIONS.push("triblader2");
sc.PARTY_OPTIONS.push("triblader3");

ig.EVENT_STEP.START_PVP_BATTLE.inject({
  init(a) {
    this.parent(a);

    let b = 110 + sc.pvp.winPoints * 10;
    b += (sc.party.getPartySize() + 1) * 16;
    b += a.enemies.length * 16;
    
    const combatHudGui = ig.gui.guiHooks.find(ui => 
      ui.gui instanceof sc.CombatHudGui
    );

    combatHudGui.gui.upperGui.sub.pvp.setSize(b, 20);
  }
});

sc.Arena.inject({
    init(){
        this.parent()
        this.registerCup('Lukas-cup',".\/assets\/data\/arena\/");
        this.registerCup('Schneiders-cup',".\/assets\/data\/arena\/");
        this.registerCup('Triblader-cup',".\/assets\/data\/arena\/");
    }
});

ig.ACTION_STEP.REMOVE_ALL_PROXIES = ig.ActionStepBase.extend({
    init: function(a) {
        this.group = a.group || null
    },
    start: function(a) {
        for (var a = ig.game.entities, b = a.length; b--;) {
            var d = a[b];
            d && (d instanceof sc.CombatProxyEntity && d.group == this.group) && d.destroy()
        }
    }
});

ig.ACTION_STEP.COMBAT_ART_CHARGE_NOZOOM = ig.ActionStepBase.extend({
  _wm: new ig.Config({
    attributes: {
      element: {
        _type: "String",
        _info: "Element of the charge",
        _select: sc.ELEMENT
      },
      level: {
        _type: "Integer",
        _info: "Level to charge to"
      }
    }
  }),
  init: function (a) {
    this.element = sc.ELEMENT[a.element];
    this.level = a.level
  },
  start: function (a) {
    a.stepData.fx = new sc.CombatCharge(a, false, false, false);
    a.stepData.level = 0;
    a.addActionAttached(a.stepData.fx);
    this.chargeStep(a)
  },
  chargeStep: function (a) {
    a.stepData.level++;
    a.stepTimer = a.stepData.level < this.level ? a.stepTimer + 0.4 : a.stepTimer + 0.3;
    a.stepData.fx.charge(this.element, a.stepData.level)
  },
  run: function (a) {
    if (a.stepTimer <=
      0) {
      if (a.stepData.level == this.level) {
        a.stepData.fx.stop();
        a.params.consumeSp(sc.PLAYER_SP_COST[this.level - 1]);
        return true
      }
      this.chargeStep(a)
    }
    return false
  }
});

ig.ACTION_STEP.WAIT_WHILE_AIMING = ig.ActionStepBase.extend({
  _wm: new ig.Config({
    attributes: {
      maxTime: {
        _type: "Number",
        _info: "Maximum time to wait"
      }
    }
  }),
  init: function (a) {
    this.maxTime = a.maxTime;
  },
  start: function (a) {
    a.stepTimer = a.stepTimer + this.maxTime
  },
  run: function (a) {
    a = a.getCombatantRoot();
    if (a.isPlayer)
      if (ig.input.currentDevice == ig.INPUT_DEVICES.KEYBOARD_AND_MOUSE) a.gui.crosshair.getDir(a.face);
      else {
        sc.control.moveDir(r, 1);
        Vec2.isZero(r) || Vec2.assign(a.face, r)
      } a.combo.guardTrapTime = a.combo.guardTrapTime + ig.system.tick;
    if (a.stepTimer <= 0) {
      a.combo.guardTrapTime = 0;
      return true
    }
    return false
  }
});

sc.STAT_CHANGE_SETTINGS["ATTACK-MINUS-OVERCLOCK"] = {
  change: sc.STAT_CHANGE_TYPE.STATS,
  type: sc.STAT_PARAM_TYPE.ATTACK,
  value: 0.90,
  negative: true,
  icon: "stat-attack",
  grade: "stat-rank-down-1"
};

sc.STAT_CHANGE_SETTINGS["FOCUS-MINUS-OVERCLOCK"] = {
  change: sc.STAT_CHANGE_TYPE.STATS,
  type: sc.STAT_PARAM_TYPE.FOCUS,
  value: 0.75,
  negative: true,
  icon: "stat-focus",
  grade: "stat-rank-down-2"
};

sc.STAT_CHANGE_SETTINGS["DEFENSE-BLADEAURA"] = {
    change: sc.STAT_CHANGE_TYPE.STATS,
    type: sc.STAT_PARAM_TYPE.DEFENSE,
    value: 1.20,
    icon: "stat-defense",
    grade: "stat-rank-1"
};

sc.STAT_CHANGE_SETTINGS["DEFENSE-SHIELDS"] = {
    change: sc.STAT_CHANGE_TYPE.STATS,
    type: sc.STAT_PARAM_TYPE.DEFENSE,
    value: 1.35,
    icon: "stat-defense",
    grade: "stat-rank-2"
};

sc.STAT_CHANGE_SETTINGS["SPIKE_DMG-0"] = {
    change: sc.STAT_CHANGE_TYPE.MODIFIER,
    type: sc.STAT_PARAM_TYPE.SPIKE_DMG,
    value: -10,
    negative: true,
    icon: "stat-spike-dmg",
    grade: "stat-rank-down-3"
};

sc.STAT_CHANGE_SETTINGS["ATTACK-SACRIFICE"] = {
    change: sc.STAT_CHANGE_TYPE.STATS,
    type: sc.STAT_PARAM_TYPE.ATTACK,
    value: 1.15,
    icon: "stat-attack",
    grade: "stat-rank-1"
  };