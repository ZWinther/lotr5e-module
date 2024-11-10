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
	// CONFIG CHANGES
	Object.assign(CONFIG.DND5E.limitedUsePeriods, {
		jrny: { label: "LOTR.Journey", abbreviation: "LOTR.JourneyAbbr" },
		adv: { label: "LOTR.Adventure", abbreviation: "LOTR.AdventureAbbr" }
	});

	delete CONFIG.DND5E.consumableTypes.scroll;
	delete CONFIG.DND5E.consumableTypes.wand;
	delete CONFIG.DND5E.consumableTypes.rod;

	Object.assign(CONFIG.DND5E.itemProperties, {
		fel: { label: "LOTR.WeaponPropertiesFel" },
		gri: { label: "LOTR.WeaponPropertiesGri" },
		kee: { label: "LOTR.WeaponPropertiesKee" },
		clo: { label: "LOTR.ArmorPropertiesClo" },
		cun: { label: "LOTR.ArmorPropertiesCun" },
		rei: { label: "LOTR.ArmorPropertiesRei" }
	});

	const validWProperties = [ 'fel', 'gri', 'kee' ];
	validWProperties.forEach(item => CONFIG.DND5E.validProperties.weapon.add(item));
	const removedWProperties = [ 'fir', 'foc', 'rel', 'ret' ];
	removedWProperties.forEach(item => CONFIG.DND5E.validProperties.weapon.delete(item));
	const validAProperties = [ 'clo', 'cun', 'rei' ];
	validAProperties.forEach(item => CONFIG.DND5E.validProperties.equipment.add(item));
	const removedAProperties = [ 'foc' ];
	removedAProperties.forEach(item => CONFIG.DND5E.validProperties.equipment.delete(item));

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
	Object.assign(CONFIG.DND5E.toolTypes, {
		pipe: "LOTR.ToolPipeProf"
	});

	Object.assign(CONFIG.DND5E.toolProficiencies, {
		pipe: "LOTR.ToolPipeProf"
	});

	delete CONFIG.DND5E.skills.arc;
	delete CONFIG.DND5E.skills.his;
	delete CONFIG.DND5E.skills.med;
	delete CONFIG.DND5E.skills.rel;
	delete CONFIG.DND5E.skills.sur;

	Object.assign(CONFIG.DND5E.skills, {
		ins: { label: "LOTR.SkillIns", ability: "wis" },
		lor: { label: "LOTR.SkillLor", ability: "int" },
		mdc: { label: "LOTR.SkillMed", ability: "int" },
		rid: { label: "LOTR.SkillRid", ability: "int" },
		hun: { label: "LOTR.SkillHun", ability: "wis" },
		exp: { label: "LOTR.SkillExp", ability: "wis" },
		tra: { label: "LOTR.SkillTra", ability: "wis" }
	});

	Object.assign(CONFIG.DND5E.abilities, {
		sha: { label: "LOTR.AbilitySha", abbreviation: "DND5E.AbilityShaAbbr", type: "mental", defaults: { vehicle: 0 }, improvement: false },
		perm: {	label: "LOTR.AbilityPerm", abbreviation: "DND5E.AbilityPermAbbr", type: "mental", defaults: { vehicle: 0 }, improvement: false }
	});

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

	game.settings.register("lotr5e", "spellbookToggle", {
		name: `${game.i18n.localize("LOTR.Settings.SpellbookToggle.name")}`,
		hint: game.i18n.localize("LOTR.Settings.SpellbookToggle.hint"),
		scope: "user",
		config: true,
		default: false,
		type: Boolean
	});

    loadTemplates([
		'modules/lotr5e/templates/lotr-miserable-box2.hbs',
		'modules/lotr5e/templates/lotr-summary2.hbs',
		'modules/lotr5e/templates/lotr-fellowship-box.hbs',
		'modules/lotr5e/templates/lotr-patron-box.hbs',
		'modules/lotr5e/templates/lotr-armorProp.hbs'
	]);
});
function formatText(value) {
	return new Handlebars.SafeString(value?.replaceAll("\n", "<br>") ?? "");
}
Hooks.on('renderActorSheet5eCharacter2', async function (app, html, data) {
	const actor = data.actor;
		const misBox2 = "/modules/lotr5e/templates/lotr-miserable-box2.hbs"
		const misHtml2 = await renderTemplate(misBox2, actor);
		var inspDiv2 = $(html).find("button.inspiration");
		inspDiv2.after(misHtml2);

		const bio2 = "/modules/lotr5e/templates/lotr-summary2.hbs"
		const bioHtml2 = await renderTemplate(bio2, data);
		var bioDiv2 = $(html).find('ul.characteristics');
		bioDiv2.append(bioHtml2);

		const lotrScores = $(html).find('.ability-score[data-ability="sha"], .ability-score[data-ability="perm"]');
        lotrScores.each(function() {
            const lotrScoreLabel = $(this).find('a');
            const lotrScoreOldMod = $(this).find('.mod');
            const lotrScore = $(this).find('.score');
			let lotrScoreNewMod;
            if (lotrScore[0]?.innerHTML.includes('input')) {
                lotrScoreNewMod = lotrScore.find('input').val();
				console.log(lotrScoreNewMod);
            } else {
                lotrScoreNewMod = lotrScore.text();
            }
            const lotrModHtml = `<div class="mod">${lotrScoreNewMod}</div>`;
            lotrScoreLabel.removeClass("rollable");
            lotrScoreOldMod.replaceWith(lotrModHtml);
		});

		//Remove spellbook tab if setting is enabled
		if (game.settings.get("lotr5e", "spellbookToggle")) {
			$(html).find('*[data-tab="spells"]').remove()
		};
});
Hooks.on('renderGroupActorSheet', async function (app, html, data) { 
		const actor = data.actor;
		var groupMove = $(html).find("li.attribute.movement");
		const fellowshipBox = "/modules/lotr5e/templates/lotr-fellowship-box.hbs";
		const fellowshipHtml = await renderTemplate(fellowshipBox, actor);
		$(fellowshipHtml).insertAfter(groupMove);
	
		var summary = $(html).find(".summary")[0];
		const patronBox = "/modules/lotr5e/templates/lotr-patron-box.hbs";
		const patronHtml = await renderTemplate(patronBox, actor);
		$(patronHtml).insertAfter(summary);
	});

	Hooks.on('renderActorSheet5eVehicle', async function (app, html, data) {
		const npcSha = $(html).find('[data-ability="sha"]');
		const npcPerm = $(html).find('[data-ability="perm"]');
		npcSha.remove();
		npcPerm.remove();
	});
	Hooks.on('renderActorSheet5eNPC2', async function (app, html, data) {
		const npcSha = $(html).find('[data-ability="sha"]');
		const npcPerm = $(html).find('[data-ability="perm"]');
		npcSha.remove();
		npcPerm.remove();
	});
