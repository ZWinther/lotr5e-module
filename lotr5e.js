// Remind users to install/enable libwrapper
Hooks.once('ready', () => {
    if(!game.modules.get('lib-wrapper')?.active && game.user.isGM)
        ui.notifications.error("The Lord of the Rings Roleplaying 5E requires the 'libWrapper' module. Please install and activate it.");
});

// Handlebars helpers

// less than
Handlebars.registerHelper('lst', function( a, b ){
	var next =  arguments[arguments.length-1];
	return (a < b) ? next.fn(this) : next.inverse(this);
});
// greater than
Handlebars.registerHelper('grt', function( a, b ){
	var next =  arguments[arguments.length-1];
	return (a > b) ? next.fn(this) : next.inverse(this);
});
// equal than
Handlebars.registerHelper('eqt', function( a, b ){
	var next =  arguments[arguments.length-1];
	return (a == b) ? next.fn(this) : next.inverse(this);
});
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
Hooks.on('init', async function () {

	//DO CONFIG CHANGES
	CONFIG.DND5E.limitedUsePeriods = {
		sr: {
			label: "DND5E.UsesPeriods.Sr",
			abbreviation: "DND5E.UsesPeriods.SrAbbreviation"
		},
		lr: {
			label: "DND5E.UsesPeriods.Lr",
			abbreviation: "DND5E.UsesPeriods.LrAbbreviation"
		},
		day: {
			label: "DND5E.UsesPeriods.Day",
			abbreviation: "DND5E.UsesPeriods.DayAbbreviation"
		},
		charges: {
			label: "DND5E.UsesPeriods.Charges",
			abbreviation: "DND5E.UsesPeriods.ChargesAbbreviation",
			formula: true
		},
		dawn: {
			label: "DND5E.UsesPeriods.Dawn",
			abbreviation: "DND5E.UsesPeriods.DawnAbbreviation",
			formula: true
		},
		dusk: {
			label: "DND5E.UsesPeriods.Dusk",
			abbreviation: "DND5E.UsesPeriods.DuskAbbreviation",
			formula: true
		},
		jrny: {
			label: "LOTR.Journey",
			abbreviation: "LOTR.Journey",
			formula: true
		},
		adv: {
			label: "LOTR.Adventure",
			abbreviation: "LOTR.Adventure",
			formula: true
		}
	};

	CONFIG.DND5E.consumableTypes = {
		ammo: {
			label: "DND5E.ConsumableAmmo",
			subtypes: {
				arrow: "DND5E.ConsumableAmmoArrow",
				blowgunNeedle: "DND5E.ConsumableAmmoBlowgunNeedle",
				crossbowBolt: "DND5E.ConsumableAmmoCrossbowBolt",
				slingBullet: "DND5E.ConsumableAmmoSlingBullet"
			}
		},
		potion: {
			label: "DND5E.ConsumablePotion"
		},
		poison: {
			label: "DND5E.ConsumablePoison",
			subtypes: {
				contact: "DND5E.ConsumablePoisonContact",
				ingested: "DND5E.ConsumablePoisonIngested",
				inhaled: "DND5E.ConsumablePoisonInhaled",
				injury: "DND5E.ConsumablePoisonInjury"
			}
		},
		food: {
			label: "DND5E.ConsumableFood"
		},
		//scroll: {
		//	label: "DND5E.ConsumableScroll"
		//},
		//wand: {
		//	label: "DND5E.ConsumableWand"
		//},
		//rod: {
		//	label: "DND5E.ConsumableRod"
		//},
		trinket: {
			label: "DND5E.ConsumableTrinket"
		}
	};
	CONFIG.DND5E.weaponTypes = {
		simpleM: "DND5E.WeaponSimpleM",
		simpleR: "DND5E.WeaponSimpleR",
		martialM: "DND5E.WeaponMartialM",
		martialR: "DND5E.WeaponMartialR",
		natural: "DND5E.WeaponNatural",
		improv: "DND5E.WeaponImprov",
		siege: "DND5E.WeaponSiege"
	};
	CONFIG.DND5E.itemProperties = {
		// ada: {
		// 	label: "DND5E.Item.Property.Adamantine",
		// 	isPhysical: true
		// },
		amm: {
			label: "DND5E.Item.Property.Ammunition"
		},
		concentration: {
			label: "DND5E.Item.Property.Concentration",
			abbreviation: "DND5E.ConcentrationAbbr",
			icon: "systems/dnd5e/icons/svg/statuses/concentrating.svg",
			reference: "Compendium.dnd5e.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH",
			isTag: true
		},
		fin: {
			label: "DND5E.Item.Property.Finesse"
		},
		// fir: {
		// 	label: "DND5E.Item.Property.Firearm"
		// },
		// foc: {
		// 	label: "DND5E.Item.Property.Focus"
		// },
		hvy: {
			label: "DND5E.Item.Property.Heavy"
		},
		lgt: {
			label: "DND5E.Item.Property.Light"
		},
		lod: {
			label: "DND5E.Item.Property.Loading"
		},
		material: {
			label: "DND5E.Item.Property.Material",
			abbreviation: "DND5E.ComponentMaterialAbbr",
			reference: "Compendium.dnd5e.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AeH5eDS4YeM9RETC"
		},
		mgc: {
			label: "DND5E.Item.Property.Magical",
			icon: "systems/dnd5e/icons/svg/properties/magical.svg",
			isPhysical: true
		},
		rch: {
			label: "DND5E.Item.Property.Reach"
		},
		// rel: {
		// 	label: "DND5E.Item.Property.Reload"
		// },
		// ret: {
		// 	label: "DND5E.Item.Property.Returning"
		// },
		ritual: {
			label: "DND5E.Item.Property.Ritual",
			abbreviation: "DND5E.RitualAbbr",
			icon: "systems/dnd5e/icons/svg/items/spell.svg",
			reference: "Compendium.dnd5e.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FjWqT5iyJ89kohdA",
			isTag: true
		},
		// sil: {
		// 	label: "DND5E.Item.Property.Silvered",
		// 	isPhysical: true
		// },
		somatic: {
			label: "DND5E.Item.Property.Somatic",
			abbreviation: "DND5E.ComponentSomaticAbbr",
			reference: "Compendium.dnd5e.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qwUNgUNilEmZkSC9"
		},
		spc: {
			label: "DND5E.Item.Property.Special"
		},
		stealthDisadvantage: {
			label: "DND5E.Item.Property.StealthDisadvantage"
		},
		thr: {
			label: "DND5E.Item.Property.Thrown"
		},
		two: {
			label: "DND5E.Item.Property.TwoHanded"
		},
		ver: {
			label: "DND5E.Item.Property.Versatile"
		},
		vocal: {
			label: "DND5E.Item.Property.Verbal",
			abbreviation: "DND5E.ComponentVerbalAbbr",
			reference: "Compendium.dnd5e.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx"
		},
		weightlessContents: {
			label: "DND5E.Item.Property.WeightlessContents"
		}
		};

		CONFIG.DND5E.validProperties = {
		consumable: new Set([
			"mgc"
		]),
		container: new Set([
			"mgc",
			"weightlessContents"
		]),
		equipment: new Set([
			"concentration",
			"mgc"
		]),
		feat: new Set([
			"concentration",
			"mgc"
		]),
		loot: new Set([
			"mgc"
		]),
		weapon: new Set([
			// "ada",
			"amm",
			"fin",
			// "fir",
			// "foc",
			"hvy",
			"lgt",
			"lod",
			"mgc",
			"rch",
			// "rel",
			// "ret",
			// "sil",
			"spc",
			"thr",
			"two",
			"ver"
		]),
		spell: new Set([
			"vocal",
			"somatic",
			"material",
			"concentration",
			"ritual"
		]),
		tool: new Set([
			"concentration",
			"mgc"
		])
		};
	CONFIG.DND5E.physicalWeaponProperties = {
		mgc: "DND5E.WeaponPropertiesMgc"
	};
	CONFIG.DND5E.weaponProperties = {
		...CONFIG.DND5E.physicalWeaponProperties,
		amm: "DND5E.WeaponPropertiesAmm",
		fin: "DND5E.WeaponPropertiesFin",
		// fir: "DND5E.WeaponPropertiesFir",
		// foc: "DND5E.WeaponPropertiesFoc",
		hvy: "DND5E.WeaponPropertiesHvy",
		lgt: "DND5E.WeaponPropertiesLgt",
		lod: "DND5E.WeaponPropertiesLod",
		rch: "DND5E.WeaponPropertiesRch",
		// rel: "DND5E.WeaponPropertiesRel",
		// ret: "DND5E.WeaponPropertiesRet",
		spc: "DND5E.WeaponPropertiesSpc",
		thr: "DND5E.WeaponPropertiesThr",
		two: "DND5E.WeaponPropertiesTwo",
		ver: "DND5E.WeaponPropertiesVer",
		fel: "LOTR.WeaponPropertiesFel",
		gri: "LOTR.WeaponPropertiesGri",
		kee: "LOTR.WeaponPropertiesKee"
	};
	CONFIG.DND5E.armorIds = {
		//breastplate: "SK2HATQ4abKUlV8i",
		chainmail: "rLMflzmxpe8JGTOA",
		chainshirt: "p2zChy24ZJdVqMSH",
		//halfplate: "vsgmACFYINloIdPm",
		hide: "n1V07puo0RQxPGuF",
		leather: "WwdpHLXGX5r8uZu5",
		padded: "GtKV1b5uqFQqpEni",
		//plate: "OjkIqlW2UpgFcjZa",
		ringmail: "nsXZejlmgalj4he9",
		scalemail: "XmnlF5fgIO3tg6TG",
		//splint: "cKpJmsJmU8YaiuqG",
		//studded: "TIV3B1vbrVHIhQAm"
	};
	CONFIG.DND5E.armorProperties = {
		clo: "LOTR.ArmorPropertiesClo",
		cun: "LOTR.ArmorPropertiesCun",
		rei: "LOTR.ArmorPropertiesRie"
	};
	CONFIG.DND5E.currencies = {
	gp: {
		label: "LOTR.CoinsGP",
		abbreviation: "LOTR.CoinsAbbrGP",
		conversion: 1
	},
	sp: {
		label: "LOTR.CoinsSP",
		abbreviation: "LOTR.CoinsAbbrSP",
		conversion: 10
	},
	cp: {
		label: "LOTR.CoinsCC",
		abbreviation: "LOTR.CoinsAbbrCC",
		conversion: 100
	}
	};
	CONFIG.DND5E.toolTypes = {
		art: "DND5E.ToolArtisans",
		game: "DND5E.ToolGamingSet",
		music: "DND5E.ToolMusicalInstrument",
		pipe: "LOTR.ToolPipe"
	};
	CONFIG.DND5E.toolProficiencies = {
		...CONFIG.DND5E.toolTypes,
		vehicle: "DND5E.ToolVehicle",
		pipe: "LOTR.ToolPipeProf"
	};

	CONFIG.DND5E.skills = {
		acr: { label: "DND5E.SkillAcr", ability: "dex" },
		ani: { label: "DND5E.SkillAni", ability: "wis" },
		// arc: { label: "DND5E.SkillArc", ability: "int" },
		ath: { label: "DND5E.SkillAth", ability: "str" },
		dec: { label: "DND5E.SkillDec", ability: "cha" },
	//   his: { label: "DND5E.SkillHis", ability: "int" },
		ins: { label: "LOTR.SkillIns", ability: "wis" },
		itm: { label: "DND5E.SkillItm", ability: "cha" },
		inv: { label: "DND5E.SkillInv", ability: "int" },
		lor: { label: "LOTR.SkillLor", ability: "int" },
		// med: { label: "DND5E.SkillMed", ability: "int" },
		mdc: { label: "LOTR.SkillMed", ability: "int" },
		nat: { label: "DND5E.SkillNat", ability: "int" },
		prc: { label: "DND5E.SkillPrc", ability: "wis" },
		prf: { label: "DND5E.SkillPrf", ability: "cha" },
		per: { label: "DND5E.SkillPer", ability: "cha" },
		rid: { label: "LOTR.SkillRid", ability: "int" },
		hun: { label: "LOTR.SkillHun", ability: "wis" },
		exp: { label: "LOTR.SkillExp", ability: "wis" },
		// rel: { label: "DND5E.SkillRel", ability: "int" },
		slt: { label: "DND5E.SkillSlt", ability: "dex" },
		ste: { label: "DND5E.SkillSte", ability: "dex" },
		// sur: { label: "DND5E.SkillSur", ability: "wis" },
		tra: { label: "LOTR.SkillTra", ability: "wis" }
	};
	// preLocalize("skills", { key: "label", sort: true });
	// patchConfig("skills", "label", { since: 2.0, until: 2.2 });

	CONFIG.DND5E.abilities = {
		str: {
			label: "DND5E.AbilityStr",
			abbreviation: "DND5E.AbilityStrAbbr",
			type: "physical"
		},
		dex: {
			label: "DND5E.AbilityDex",
			abbreviation: "DND5E.AbilityDexAbbr",
			type: "physical"
		},
		con: {
			label: "DND5E.AbilityCon",
			abbreviation: "DND5E.AbilityConAbbr",
			type: "physical"
		},
		int: {
			label: "DND5E.AbilityInt",
			abbreviation: "DND5E.AbilityIntAbbr",
			type: "mental",
			defaults: { vehicle: 0 }
		},
		wis: {
			label: "DND5E.AbilityWis",
			abbreviation: "DND5E.AbilityWisAbbr",
			type: "mental",
			defaults: { vehicle: 0 }
		},
		cha: {
			label: "DND5E.AbilityCha",
			abbreviation: "DND5E.AbilityChaAbbr",
			type: "mental",
			defaults: { vehicle: 0 }
		},
		sha: {
			label: "LOTR.AbilitySha",
			abbreviation: "DND5E.AbilityShaAbbr",
			type: "mental",
			defaults: { vehicle: 0 },
			improvement: false
		},
		perm: {
		label: "LOTR.AbilityPerm",
		abbreviation: "DND5E.AbilityPermAbbr",
		type: "mental",
		defaults: { vehicle: 0 },
		improvement: false
		}
	};

	CONFIG.DND5E.languages = {
		common: "LOTR.LanguagesCommon",
		blackspeech: "LOTR.LanguagesBlackSpeech",
		ancient: "LOTR.LanguagesQuenya",
		sindarin: "LOTR.LanguagesSindarin",
		dalish: "LOTR.LanguagesDalish",
		vale: "LOTR.LanguagesVale",
		dwarvish: "LOTR.LanguagesDwarvish",
		woodland: "LOTR.LanguagesWoodland",
		rohan: "LOTR.LanguagesRohan",
		orkish: "LOTR.LanguagesOrkish"
	};
	// preLocalize("languages", { sort: true });

	CONFIG.DND5E.newSkills = [
		{
			skl: "lor",
			ability: "int"
		},
		{
			skl: "rid",
			ability: "int"
		},
		{
			skl: "hun",
			ability: "wis"
		},
		{
			skl: "tra",
			ability: "wis"
		},
		{
			skl: "mdc",
			ability: "int"
		},
		{
			skl: "exp",
			ability: "wis"
		},
	];
	// preLocalize("newSkills");

	CONFIG.DND5E.newScores = [
		{
			scr: "sha",
			proficient: "0"
		},
		{
			scr: "perm",
			proficient: "0"
		},
	];

	game.settings.register("lotr5e", "spellbookToggle", {
		name: `${game.i18n.localize("LOTR.Settings.SpellbookToggle.name")}`,
		hint: game.i18n.localize("LOTR.Settings.SpellbookToggle.hint"),
		scope: "user",
		config: true,
		default: false,
		type: Boolean
	});

	const tidy5eModule = game.modules?.get('tidy5e-sheet')?.active;

	if (tidy5eModule === true) {
		loadTemplates([
		'modules/lotr5e/templates/lotr-tidy5e-standard.hbs',
		]);
	}
    loadTemplates([
		'modules/lotr5e/templates/lotr-miserable-box.hbs',
		'modules/lotr5e/templates/lotr-scores-end.hbs',
		'modules/lotr5e/templates/lotr-shadow-path.hbs'
	]);

	CONFIG.DND5E.delSkills = ["arc", "rel", "tss", "sur", "med", "tst"];

	// Remove PP and EP from showing up on character sheet displays since we don't use them in LOTR5E	
	libWrapper.register("lotr5e", "game.dnd5e.applications.actor.ActorSheet5eCharacter.prototype.getData", async function patchedActorSheet5eCharacter(wrapped, ...args) {

		const data = await wrapped(...args);
		delete data.system.currency.pp;
		delete data.system.currency.ep;

		// Return data to the sheet
		return data

	}, "WRAPPER");

	// Remove PP and EP from showing up on vehicle sheet displays since we don't use them in LOTR5E	
	libWrapper.register("lotr5e", "game.dnd5e.applications.actor.ActorSheet5eVehicle.prototype.getData", async function patchedActorSheet5eCharacter(wrapped, ...args) {

		const data = await wrapped(...args);
		delete data.system.currency.pp;
		delete data.system.currency.ep;

		// Return data to the sheet
		return data
	}, "WRAPPER");

	libWrapper.register("lotr5e", "CONFIG.Actor.documentClass.prototype.prepareDerivedData", function patchedPrepareDerivedData(wrapped, ...args) {
    wrapped(...args);

		    //FIX CUSTOM SKILL ABILITIES
		const source = this._source.system;
		const newScores = CONFIG.DND5E.newScores;
		const scoreData = this.system.abilities;
		const scoreSource = source.abilities;
		const newSkills = CONFIG.DND5E.newSkills;
		const skillData = this.system.skills;
		const skillSource = source.skills;
		const delSkills = ["arc", "rel", "tss", "med", "sur", "tst"];

		
		
		if ( this.type != "vehicle" && this.type != "group" ) {
		newSkills.forEach(e => {
			let sklName = e["skl"];
			let sklAbility = e["ability"];
			if (typeof (skillData[sklName]) == "undefined") {
				skillData[sklName] = new Object();
				skillData[sklName].value = 0;
				skillData[sklName].ability = sklAbility;
			}
			if (typeof (skillData[sklName].ability) == "undefined") {
				skillData[sklName].ability = [sklAbility];
			}
		});
		newSkills.forEach(e => {
		let sklName = e["skl"];
		let sklAbility = e["ability"];
		if (typeof (skillSource[sklName]) == "undefined") {
			skillSource[sklName] = new Object();
			skillSource[sklName].value = 0;
			skillSource[sklName].ability = sklAbility;
		}
		if (typeof (skillSource[sklName].ability) == "undefined") {
			skillSource[sklName].ability = [sklAbility];
	}
	});
	};

}, "WRAPPER");
libWrapper.register("lotr5e", "CONFIG.Actor.dataModels.character.prototype.prepareDerivedData", function patchedPrepareAbilities(wrapped, ...args) {
    wrapped(...args);

	this.abilities.sha.mod = this.abilities.sha.value; 
	this.abilities.perm.mod = this.abilities.perm.value;
}, "WRAPPER");

});

function i18n(key) {
	return game.i18n.localize(key);
}
function formatText(value) {
	return new Handlebars.SafeString(value?.replaceAll("\n", "<br>") ?? "");
}
Hooks.on('renderActorSheet', async function (app, html, data) {
	const actor = data.actor;
	const sheet5e = app.options.classes.join();
	if (sheet5e === "dnd5e2,sheet,actor,character") {
		const misBox2 = "/modules/lotr5e/templates/lotr-miserable-box2.hbs"
		const misHtml2 = await renderTemplate(misBox2, actor);
		var inspDiv2 = $(html).find("button.inspiration");
		inspDiv2.after(misHtml2);

		const bio2 = "/modules/lotr5e/templates/lotr-summary2.hbs"
		const bioHtml2 = await renderTemplate(bio2, data);
		var bioDiv2 = $(html).find('ul.characteristics');
		bioDiv2.append(bioHtml2);

		//Remove spellbook tab if setting is enabled
		if (game.settings.get("lotr5e", "spellbookToggle")) {
			$(html).find('*[data-tab="spells"]').remove()
		};
	}
	if (sheet5e === "dnd5e,sheet,actor,character") {
		const misBox = "/modules/lotr5e/templates/lotr-miserable-box.hbs"
		const misHtml = await renderTemplate(misBox, actor);
		var inspDiv = $(html).find(".flexrow.inspiration");
		inspDiv[0].outerHTML = misHtml;

        const scoreBox = "/modules/lotr5e/templates/lotr-scores-end.hbs"
        const scoreHtml = await renderTemplate(scoreBox, data);
        var abiScores = $(html).find(".ability-scores.flexrow");
        var endScores = $(html).find( ".ability-scores.flexrow li" ).slice(6);
        endScores.remove()
		abiScores.append(scoreHtml)

		

        // const livingBox = "/modules/lotr5e/templates/lotr-shadow-path.hbs"
        // const livingHtml = await renderTemplate(livingBox, data);
        var alignment = $(html).find('*[name="system.details.alignment"]').parent()[0];
        // alignment.innerHTML = livingHtml;
		alignment.remove();

		const SumBox = "/modules/lotr5e/templates/lotr-summary.hbs"
        const SumHtml = await renderTemplate(SumBox, actor);
        var summary = $(html).find('.summary')[0];
        // summary = SumHtml;
		$(SumHtml).insertAfter(summary);

        //Remove spellbook tab if setting is enabled
		if (game.settings.get("lotr5e", "spellbookToggle")) {
        $(html).find('*[data-tab="spellbook"]').remove()
		};

        $(html).find(".dnd5e.sheet.actor.character").css("min-height", "823px");
    }
    	if (sheet5e === "dnd5e,sheet,actor,npc") {
			var npcSha = $(html).find('[data-ability="sha"]');
			var npcPerm = $(html).find('[data-ability="perm"]');
			$(html).find('*[name="system.details.alignment"]').parent().remove()
			npcSha.remove();
			npcPerm.remove();
        }

        if (sheet5e === "dnd5e,sheet,actor,vehicle") {
			var npcSha = $(html).find('[data-ability="sha"]');
			var npcPerm = $(html).find('[data-ability="perm"]');
			npcSha.remove();
			npcPerm.remove();
        }
	// Add fellowship box to the sheet
	if (sheet5e === "dnd5e,sheet,actor,group") {
		var groupMove = $(html).find("li.attribute.movement");
		const fellowshipBox = "/modules/lotr5e/templates/lotr-fellowship-box.hbs";
		const fellowshipHtml = await renderTemplate(fellowshipBox, actor);
		$(fellowshipHtml).insertAfter(groupMove);
	
		var summary = $(html).find(".summary")[0];
		const patronBox = "/modules/lotr5e/templates/lotr-patron-box.hbs";
		const patronHtml = await renderTemplate(patronBox, actor);
		$(patronHtml).insertAfter(summary);
	}
    });

	Hooks.on("renderTidy5eSheet", async (app, html, data) => {
		const actorData = data.actor;
		const tidyGP = "/modules/lotr5e/templates/lotr-tidy5e-gp.hbs"
		const tidyGPRender =  await renderTemplate(tidyGP, data);
		const tidySP = "/modules/lotr5e/templates/lotr-tidy5e-sp.hbs"
		const tidySPRender =  await renderTemplate(tidySP, data);
		const tidyCP = "/modules/lotr5e/templates/lotr-tidy5e-cp.hbs"
		const tidyCPRender =  await renderTemplate(tidyCP, data);
		const livingBox = "/modules/lotr5e/templates/lotr-tidy5e-standard.hbs"
		const livingHtml = await renderTemplate(livingBox, data);
		const tidyMisBox = "/modules/lotr5e/templates/lotr-tidy5e-miserable.hbs"
		const tidyMisHtml = await renderTemplate(tidyMisBox, actorData);
		const tidyAngBox = "/modules/lotr5e/templates/lotr-tidy5e-anguished.hbs"
		const tidyAngHtml = await renderTemplate(tidyAngBox, actorData);
		let tidyBG = $(html).find('[data-input*="background"]');
		let tidySummaryDel = $(html).find( '[data-target*="alignment"], [data-input*="alignment"]' );
		let tidyInspiration = $(html).find('.inspiration');

		
		
		// Add new fields to character summary
		tidySummaryDel.remove();
		tidyBG.after(livingHtml);

		// Remove mod/save box from new scores
		var tidySha = $(html).find('[data-ability="sha"]').find('.value-footer');
		var tidyPerm = $(html).find('[data-ability="perm"]').find('.value-footer');
		var tidyCogPerm = $(html).find('[data-ability="perm"]').find('.config-button');
		var tidyCogSha = $(html).find('[data-ability="sha"]').find('.config-button');
		tidySha.remove();
		tidyPerm.remove();
		tidyCogSha.remove();
		tidyCogPerm.remove();

		// Add Miserable & Anguished buttons next to Inspiration button
		tidyInspiration.after(tidyMisHtml);
		let tidyMis = $(html).find('.miserable');	
		tidyMis.after(tidyAngHtml);

		//Remove spellbook tab if setting is enabled
		if (game.settings.get("lotr5e", "spellbookToggle")) {
			$(html).find('[data-tab="spellbook"]').remove()	
		};

		// Change currency abbreviations
		var tidyGPReplace = $(html).find('.denomination.gp')[0];
		tidyGPReplace.innerHTML = tidyGPRender;
		var tidySPReplace = $(html).find('.denomination.sp')[0];
		tidySPReplace.innerHTML = tidySPRender;
		var tidyCPReplace = $(html).find('.denomination.cp')[0];
		tidyCPReplace.innerHTML = tidyCPRender;

		html.find('[contenteditable]').on('paste', function(e) {
			//strips elements added to the editable tag when pasting
			let $self = $(this);
		
			// set maxlength
			let maxlength = 40;
			if($self[0].dataset.maxlength){
			  maxlength = parseInt($self[0].dataset.maxlength);
			}
		
			setTimeout(function() {
			  let textString = $self.text();
			  textString = textString.substring(0,maxlength);
			  $self.html(textString);
			}, 0);
		
		  }).on('keypress', function(e) {
			let $self = $(this);
		
			// set maxlength
			let maxlength = 40;
			if($self[0].dataset.maxlength){
			  maxlength = parseInt($self[0].dataset.maxlength);
			}
		
			// only accept backspace, arrow keys and delete after maximum characters
			let keys = [8,37,38,39,40,46];
		
			if($(this).text().length === maxlength && keys.indexOf(e.keyCode) < 0) { 
			  e.preventDefault();
			}
		
			if(e.keyCode===13){
			  $(this).blur();
			}
		  });
		
		  html.find('[contenteditable]').blur(async (event) => {
			let value = event.target.textContent;
			let target = event.target.dataset.target;
			html.find('input[type="hidden"][data-input="'+target+'"]').val(value).submit();
		  });
	});
Hooks.on("renderTidy5eNPC", async (app, html, data) => {
	const tidyNpcCurrency = $(html).find('.inventory-currency');

	// If NPC remove Shadow and Perm scores
		let npcSha = $(html).find('[data-ability="sha"]');
		let npcPerm = $(html).find('[data-ability="perm"]');
		npcSha.remove();
		npcPerm.remove();
	
	// Currency
	tidyNpcCurrency.remove();
});

Hooks.on("renderTidy5eVehicle", async (app, html, data) => {
	const tidyGP = "/modules/lotr5e/templates/lotr-tidy5e-gp.hbs"
	const tidyGPRender =  await renderTemplate(tidyGP, data);
	const tidySP = "/modules/lotr5e/templates/lotr-tidy5e-sp.hbs"
	const tidySPRender =  await renderTemplate(tidySP, data);
	const tidyCP = "/modules/lotr5e/templates/lotr-tidy5e-cp.hbs"
	const tidyCPRender =  await renderTemplate(tidyCP, data);

	// Remove Shadow and Perm scores
	let npcSha = $(html).find('[data-ability="sha"]');
	let npcPerm = $(html).find('[data-ability="perm"]');
	npcSha.remove();
	npcPerm.remove();

	// Change currency abbreviations
	var tidyGPReplace = $(html).find('.denomination.gp')[0];
	tidyGPReplace.innerHTML = tidyGPRender;
	var tidySPReplace = $(html).find('.denomination.sp')[0];
	tidySPReplace.innerHTML = tidySPRender;
	var tidyCPReplace = $(html).find('.denomination.cp')[0];
	tidyCPReplace.innerHTML = tidyCPRender;

});
	
Hooks.on('renderItemSheet5e', async function (app, html, data) {
	const armorPropTemp = "/modules/lotr5e/templates/lotr-armorProp.hbs"
	const armorPropHtml = await renderTemplate(armorPropTemp, data);
	var equipStatus = $('label:contains("Equipment Status")');
	equipStatus.before(armorPropHtml);
});
