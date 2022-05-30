import "./js/bgm/custom-bgm.js";

sc.PARTY_OPTIONS.push("triblader2");

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

sc.STAT_CHANGE_SETTINGS["ATTACK-MINUS-1"] = {
  change: sc.STAT_CHANGE_TYPE.STATS,
  type: sc.STAT_PARAM_TYPE.ATTACK,
  value: 0.90,
  negative: true,
  icon: "stat-attack",
  grade: "stat-rank-down-1"
};

sc.STAT_CHANGE_SETTINGS["FOCUS-MINUS-1"] = {
  change: sc.STAT_CHANGE_TYPE.STATS,
  type: sc.STAT_PARAM_TYPE.FOCUS,
  value: 0.85,
  negative: true,
  icon: "stat-focus",
  grade: "stat-rank-down-1"
};

sc.STAT_CHANGE_SETTINGS["DEFENSE-0.10"] = {
    change: sc.STAT_CHANGE_TYPE.STATS,
    type: sc.STAT_PARAM_TYPE.DEFENSE,
    value: 1.10,
    icon: "stat-defense",
    grade: "stat-rank-1"
};

sc.STAT_CHANGE_SETTINGS["DEFENSE-0.25"] = {
    change: sc.STAT_CHANGE_TYPE.STATS,
    type: sc.STAT_PARAM_TYPE.DEFENSE,
    value: 1.25,
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

b.PVP = ig.GuiElementBase.extend({
    gfx: new ig.Image("media/gui/status-gui.png"),
    heads: new ig.Image("media/gui/severed-heads.png"),
    init: function () {
      this.parent();
      var a;
      a = 230 + sc.pvp.winPoints * 10;
      a = a + (sc.party.getPartySize() + 1) * 16;
      a = a + sc.pvp.enemies.length * 16;
      this.setSize(a, 20)
    },
    updateDrawables: function (a) {
      var b = this.hook.size.x / 2;
      a.addGfx(this.gfx, b - 8, 0, 136, 160, 16, 16);
      var c = sc.pvp.winPoints;
      this._renderPoints(a, b - 12 - 4, -1, c, sc.pvp.points[sc.COMBATANT_PARTY.PLAYER], 0);
      this._renderPoints(a, b + 12, 1, c, sc.pvp.points[sc.COMBATANT_PARTY.ENEMY], 8);
      for (var c = 12 + c * 5, e = [0], f = 0; f < sc.party.getPartySize(); ++f) e.push(sc.party.getPartyMemberModelByIndex(f).getHeadIdx());
      this._renderHeads(a, b - c, true, e);
      e = [];
      for (f = 0; f < sc.pvp.enemies.length; ++f) e.push(sc.pvp.enemies[f].getHeadIdx());
      this._renderHeads(a, b + c, false, e)
    },
    _renderPoints: function (a, b, c, e, f, g) {
      for (var h = 0; h < e; ++h) {
        a.addGfx(this.gfx, b, 2, (e - h > f ? 124 : 120) + g, 160, 4, 12);
        b = b + 5 * c
      }
    },
    _renderHeads: function (a, b, c, e) {
      c && (b = b - 24);
      for (var f = 0; f < e.length; ++f) {
        a.addGfx(this.heads, b, -10, e[f] * 24, 0, 24, 24, c);
        b = b + (c ? -16 : 16)
      }
    },
    start: function () {},
    end: function () {}
  });