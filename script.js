//Receive character data in message and turn into sheet
window.addEventListener("message", function (event) {
  
  gtag('config', 'G-5MKV2DT9KR', {
  'custom_map': {'dimension1': 'Character'}
  });

  // Sends the custom dimension to Google Analytics.
  gtag('event', 'New Character', {'Character': event.data.name+": "+event.data.classLevel+" | "+event.data.race});
  
  checkContent("input", "name", "charname")[0].value = event.data.name;
  checkContent("input", "name", "classlevel")[0].value = event.data.classLevel;
  checkContent("input", "name", "race")[0].value = event.data.race;
  checkContent("input", "name", "background")[0].value = event.data.background;
  checkContent("input", "name", "alignment")[0].value = event.data.align;
  var saveAmount = checkContent("div", "class", "saves")[0].children[0]
    .childElementCount;
  for (var i = 0; i < saveAmount; i++) {
    try{
    if (event.data.saves[i].checked) {
      checkContent("input", "name", "save-prof", false)[i].checked = true;
    } else {
    }
    }
    catch{}
    checkContent("div", "class", "saves")[0].children[0].children[
      i
    ].children[1].value = event.data.saves[i].value;
  }
  var skillAmount = checkContent("div", "class", "skills")[0].children[0]
    .childElementCount;
  for (var j = 0; j < skillAmount; j++) {
    if (event.data.skills[j].checked) {
      checkContent("div", "class", "list-section")[1].children[0].children[
        j
      ].children[2].checked = true;
    } else {
    }
    checkContent("div", "class", "skills")[0].children[0].children[
      j
    ].children[1].value = event.data.skills[j].value;
  }
  var attrAmount = checkContent("div", "class", "scores")[0].children[0]
    .childElementCount;
  for (var k = 0; k < attrAmount; k++) {
    checkContent("div", "class", "scores")[0].children[0].children[
      k
    ].children[0].children[1].value = event.data.attributes[k].value;
    checkContent("div", "class", "scores")[0].children[0].children[
      k
    ].children[1].children[0].value = event.data.attributesMods[k].value;
  }
  checkContent("input", "name", "ac")[0].value = event.data.ac;
  checkContent("input", "name", "speed")[0].value = event.data.speed+"ft";
  checkContent("input", "name", "currenthp")[0].value = event.data.maxHP;
  checkContent("input", "name", "maxhp")[0].value = event.data.currHP;
  checkContent("input", "name", "temphp")[0].value = event.data.tempHP;
  checkContent("input", "name", "totalhd")[0].value = event.data.maxHitDie;
  checkContent("input", "name", "remaininghd")[0].value = event.data.currHitDie;

  var deathSuc = checkContent("input", "name", "deathsuccess", false);
  for (var q = 0; q < event.data.deathSuc; q++) {
    deathSuc[q].checked = true;
  }
  var deathFuc = checkContent("input", "name", "deathfail", false);
  for (var r = 0; r < event.data.deathFuc; r++) {
    deathFuc[r].checked = true;
  }

  checkContent("input", "name", "init", false)[0].value = event.data.init;
  switch (
    event.data.prof.substring(event.data.prof.indexOf("(")).toLowerCase()
  ) {
    case "(perception)":
      checkContent("input", "name", "passiveperception")[0].value =
        event.data.profVal;
      break;
    case "(insight)":
      checkContent("input", "name", "passiveinsight")[0].value =
        event.data.profVal;
      break;
    case "(investigation)":
      checkContent("input", "name", "passiveinvestigation")[0].value =
        event.data.profVal;
      break;
    default:
  }

  var attkRows = checkContent("input", "name", "atkname", false);
  if (attkRows.length < event.data.attacks.length) {
    for (var l = attkRows.length; l < event.data.attacks.length; l++) {
      add_attack();
    }
  } else {
  }

  for (var h = 0; h < event.data.attacks.length; h++) {
    checkContent("tbody", "id", "attacktable", false)[0].children[
      h
    ].children[0].children[0].value = event.data.attacks[h].name;
    checkContent("tbody", "id", "attacktable", false)[0].children[
      h
    ].children[1].children[0].value = event.data.attacks[h].atk;
    checkContent("tbody", "id", "attacktable", false)[0].children[
      h
    ].children[2].children[0].value = event.data.attacks[h].dmgtype;
  }

  for (var z = 0; z < event.data.traits.length; z++) {
    var textArea = checkContent("textarea", "name", "features", false)[0];
    textArea.innerHTML += event.data.traits[z].trait + "\r\n";
    textArea.innerHTML += event.data.traits[z].classType + "\r\n\r\n";
  }

  if (
    checkContent("input", "name", "spellname", false).length <
    event.data.spells.length
  ) {
    for (
      var b = checkContent("input", "name", "spellname", false).length;
      b < event.data.spells.length;
      b++
    ) {
      add_spell();
    }
  } else {
  }

  for (var a = 0; a < event.data.spells.length; a++) {
    checkContent("input", "name", "spellname", false)[a].value =
      event.data.spells[a].spell;
    checkContent("input", "name", "spelllevel", false)[a].value =
      event.data.spells[a].lvl;
    checkContent("input", "name", "spellsource", false)[a].value =
      event.data.spells[a].source;
    checkContent("input", "name", "spelltime", false)[a].value =
      event.data.spells[a].casttime;
    checkContent("input", "name", "spellrange", false)[a].value =
      event.data.spells[a].range;
    checkContent("input", "name", "spellduration", false)[a].value =
      event.data.spells[a].duration;
  }

  for (var o = 0; o < event.data.slots.length; o++) {
    checkContent("input", "name", "spellslots", false)[o].value =
      event.data.slots[o].remaining;
    checkContent("input", "name", "spellslotsmax", false)[o].value =
      event.data.slots[o].max;
  }

  checkContent("input", "name", "proficiencybonus")[0].value =
    event.data.profBonus;

  var langCats = [];
  checkContent("textarea", "name", "otherprofs")[0].innerHTML = "";
  for (var v = 0; v < event.data.langs.length; v++) {
    if (!langCats.includes(event.data.langs[v].type)) {
      checkContent("textarea", "name", "otherprofs")[0].innerHTML +=
        "" + event.data.langs[v].type + ": ";
      langCats[langCats.length] = event.data.langs[v.type];
    }
    checkContent("textarea", "name", "otherprofs")[0].innerHTML +=
      event.data.langs[v].lang + "\r\n";
  }
  
  for(var t=0;t<event.data.coins.length;t++){
    checkContent("input",'name',event.data.coins[t].type.toLowerCase())[0].value = event.data.coins[t].amount 
  }

  checkContent('textarea','name','backstory')[0].innerHTML = event.data.backstory
  checkContent('textarea','name','features-c')[0].innerHTML = event.data.addFeats
  checkContent('textarea','name','features-r')[0].innerHTML = "======Appearance======\r\n"+event.data.appearance
  checkContent("input","name",'age')[0].value = event.data.details[0].age

  checkContent("input","name",'height')[0].value = event.data.details[0].height
  checkContent("input","name",'weight')[0].value = event.data.details[0].weight
  checkContent("input","name",'eyes')[0].value = event.data.details[0].eyes
  checkContent("input","name",'skin')[0].value = event.data.details[0].skin
  checkContent("input","name",'hair')[0].value = event.data.details[0].hair
  
  checkContent('textarea','name','personality')[0].innerHTML = event.data.persTrait
  checkContent('textarea','name','ideals')[0].innerHTML = event.data.ideals
  checkContent('textarea','name','bonds')[0].innerHTML = event.data.bonds
  checkContent('textarea','name','flaws')[0].innerHTML = event.data.flaws
  
  var itemCount = event.data.items.length
  if(checkContent('input','name','itemname',false).length < itemCount){
    for(var x = checkContent('input','name','itemname',false).length;x<itemCount;x++){
      add_inventory()
    }
  }
  for(var x = 0;x<itemCount;x++){
    checkContent('input','name','itemname',false)[x].value = event.data.items[x].item
    checkContent('input','name','itemcount',false)[x].value = event.data.items[x].amount
    checkContent('input','name','itemweight',false)[x].value = event.data.items[x].weight
  }
  checkContent('input','name','weightcarried')[0].value = event.data.carriedWeight
  checkContent('textarea','name','organizations')[0].value = event.data.allies
  checkContent('textarea','name','notes-l')[0].value = event.data.treasure
  checkContent('input','name','experiencepoints')[0].value = event.data.xp
  
  
});

$(".stat").bind("input", function () {
  var inputName = $(this).attr("name");
  var mod = parseInt($(this).val()) - 10;

  if (mod % 2 == 0) mod = mod / 2;
  else mod = (mod - 1) / 2;

  if (isNaN(mod)) mod = "";
  else if (mod >= 0) mod = "+" + mod;

  var scoreName = inputName.slice(0, inputName.indexOf("score"));
  var modName = scoreName + "mod";

  $("[name='" + modName + "']").val(mod);
});

$(".statmod").bind("change", function () {
  var name = $(this).attr("name");
  name = "uses" + name.slice(0, name.indexOf("mod"));
});

$("[name='classlevel']").bind("input", function () {
  var classes = $(this).val();
  var r = new RegExp(/\d+/g);
  var total = 0;
  var result;
  while ((result = r.exec(classes)) != null) {
    var lvl = parseInt(result);
    if (!isNaN(lvl)) total += lvl;
  }
  var prof = 2;
  if (total > 0) {
    total -= 1;
    prof += Math.trunc(total / 4);
    prof = "+" + prof;
  } else {
    prof = "";
  }
  $("[name='proficiencybonus']").val(prof);
});

function totalhd_clicked() {
  $("[name='remaininghd']").val($("[name='totalhd']").val());
}

// Row counts used for saving/loading characters
var rows_attacks = 2;
var rows_inventory = 2;
var rows_attunements = 3;
var rows_spells = 2;

function save_character() {
  console.log("Saving character...");

  var filename = ".dnd";
  if (document.getElementById("charname").value == "") {
    filename = "CharacterSheet" + filename;
  } else {
    filename = document.getElementById("charname").value + filename;
  }

  // Prepare form data for JSON format
  const formId = "charsheet";
  var url = location.href;
  const formIdentifier = `${url} ${formId}`;
  let form = document.querySelector(`#${formId}`);
  let formElements = form.elements;

  let data = { [formIdentifier]: {} };
  for (const element of formElements) {
    if (element.name.length > 0) {
      if (element.type == "checkbox") {
        var checked = $("[name='" + element.name + "']").prop("checked")
          ? "checked"
          : "unchecked";
        data[formIdentifier][element.name] = checked;
      } else {
        data[formIdentifier][element.name] = element.value;
      }
    }
  }
  data = JSON.stringify(data[formIdentifier], null, 2);
  type = "application/json";

  // Save JSON to file
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

// Protective autosave feature
window.onbeforeunload = function () {
  if ($("[name='autosave']").prop("checked") == true) {
    save_character();
  }
};

// Functions for reading character from disk
function load_character(e) {
  // Autosave character
  if ($("[name='autosave']").prop("checked") == true) {
    save_character();
  }

  // Load character
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;

    // Set size of dynamic tables
    var savedData = JSON.parse(contents);

    while (rows_attacks > parseInt(savedData.rows_attacks)) {
      remove_last_row("attacktable");
    }
    while (rows_attacks < parseInt(savedData.rows_attacks)) {
      add_attack();
    }

    while (rows_attunements > parseInt(savedData.rows_attunements)) {
      remove_last_row("attunementtable");
    }
    while (rows_attunements < parseInt(savedData.rows_attunements)) {
      add_attunement();
    }

    while (rows_inventory > parseInt(savedData.rows_inventory)) {
      remove_last_row("inventorytable");
    }
    while (rows_inventory < parseInt(savedData.rows_inventory)) {
      add_inventory();
    }

    while (rows_spells > parseInt(savedData.rows_spells)) {
      remove_last_row("spelltable");
    }
    while (rows_spells < parseInt(savedData.rows_spells)) {
      add_spell();
    }

    // Prepare form data for JSON format
    const formId = "charsheet";
    var url = location.href;
    const formIdentifier = `${url} ${formId}`;
    let form = document.querySelector(`#${formId}`);
    let formElements = form.elements;

    // Display file content
    savedData = JSON.parse(contents); // get and parse the saved data from localStorage
    for (const element of formElements) {
      if (element.name in savedData) {
        if (element.type == "checkbox") {
          var checked = savedData[element.name] == "checked";
          $("[name='" + element.name + "']").prop("checked", checked);
        } else {
          element.value = savedData[element.name];
        }
      }
    }
  };
  reader.readAsText(file);
}
document
  .getElementById("buttonload")
  .addEventListener("change", load_character, false);

function long_rest() {
  console.log("Taking long rest...");
  /*
   *  To do on a long rest:
   *
   *  x Reset hit points to max HP
   *  x Reset hit dice to max hit dice
   *  x Reset all spell slots available to max
   *  x Reset all death saves
   *  x Remind player to reset temp HP and limited use features and items
   *
   */

  $("[name='currenthp']").val($("[name='maxhp']").val());
  $("[name='remaininghd']").val($("[name='totalhd']").val());

  $("[name='spellslots1']").val($("[name='spellslotsmax1']").val());
  $("[name='spellslots2']").val($("[name='spellslotsmax2']").val());
  $("[name='spellslots3']").val($("[name='spellslotsmax3']").val());
  $("[name='spellslots4']").val($("[name='spellslotsmax4']").val());
  $("[name='spellslots5']").val($("[name='spellslotsmax5']").val());
  $("[name='spellslots6']").val($("[name='spellslotsmax6']").val());
  $("[name='spellslots7']").val($("[name='spellslotsmax7']").val());
  $("[name='spellslots8']").val($("[name='spellslotsmax8']").val());
  $("[name='spellslots9']").val($("[name='spellslotsmax9']").val());
  $("[name='pactslots1']").val($("[name='pactslotsmax1']").val());

  $("[name='deathsuccess1']").prop("checked", false);
  $("[name='deathsuccess2']").prop("checked", false);
  $("[name='deathsuccess3']").prop("checked", false);
  $("[name='deathfail1']").prop("checked", false);
  $("[name='deathfail2']").prop("checked", false);
  $("[name='deathfail3']").prop("checked", false);

  alert(
    "Hit points, hit dice, and spell slots have been refreshed.\n\nPlease remember to reset Limited Use abilities, temporary hit points, and other effects as needed."
  );
}

function add_attack() {
  var tableRef = document.getElementById("attacktable");

  var row = tableRef.insertRow(tableRef.rows.length);

  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);

  cell0.innerHTML =
    "<td><input name='atkname" + rows_attacks + "' type='text'/></td>";
  cell1.innerHTML =
    "<td><input name='atkbonus" + rows_attacks + "' type='text'/></td>";
  cell2.innerHTML =
    "<td><input name='atkdamage" + rows_attacks + "' type='text'/></td>";
  cell3.innerHTML =
    "<td colspan='2'><input name='atknotes" +
    rows_attacks +
    "' type='text'/></td>";

  rows_attacks += 1;
  $("[name='rows_attacks']").val(rows_attacks);
}

function add_spell() {
  var tableRef = document.getElementById("spelltable");

  var row = tableRef.insertRow(tableRef.rows.length);

  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  var cell5 = row.insertCell(5);
  var cell6 = row.insertCell(6);
  var cell7 = row.insertCell(7);
  var cell8 = row.insertCell(8);
  var cell9 = row.insertCell(9);

  cell0.innerHTML =
    "<td><input name='spellprep" + rows_spells + "' type='checkbox' /></td>";
  cell1.innerHTML =
    "<td><input name='spellname" + rows_spells + "' type='text' /></td>";
  cell2.innerHTML =
    "<td><input name='spelllevel" + rows_spells + "' type='text' /></td>";
  cell3.innerHTML =
    "<td><input name='spellsource" + rows_spells + "' type='text' /></td>";
  cell4.innerHTML =
    "<td><input name='spellattacksave" + rows_spells + "' type='text' /></td>";
  cell5.innerHTML =
    "<td><input name='spelltime" + rows_spells + "' type='text' /></td>";
  cell6.innerHTML =
    "<td><input name='spellrange" + rows_spells + "' type='text' /></td>";
  cell7.innerHTML =
    "<td><input name='spellduration" + rows_spells + "' type='text' /></td>";
  cell8.innerHTML =
    "<td><input name='spellcomponents" + rows_spells + "' type='text' /></td>";
  cell9.innerHTML =
    "<td><input name='spellnotes" + rows_spells + "' type='text' /></td>";

  rows_spells += 1;
  $("[name='rows_spells']").val(rows_spells);
}

function add_inventory() {
  var tableRef = document.getElementById("inventorytable");

  var row = tableRef.insertRow(tableRef.rows.length);

  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  var cell5 = row.insertCell(5);

  cell0.innerHTML =
    "<td><input name='itemequipped" +
    rows_inventory +
    "' type='checkbox' /></td>";
  cell1.innerHTML =
    "<td><input name='itemname" + rows_inventory + "' type='text' /></td>";
  cell2.innerHTML =
    "<td><input name='itemcount" +
    rows_inventory +
    "' type='text' onchange='calc_carry_weight()' /></td>";
  cell3.innerHTML =
    "<td><input name='itemweight" +
    rows_inventory +
    "' type='text' onchange='calc_carry_weight()' /></td>";
  cell4.innerHTML =
    "<td><input name='itemvalue" + rows_inventory + "' type='text' /></td>";
  cell5.innerHTML =
    "<td><input name='itemnotes" + rows_inventory + "' type='text' /></td>";

  rows_inventory += 1;
  $("[name='rows_inventory']").val(rows_inventory);
}

function add_attunement() {
  var tableRef = document.getElementById("attunementtable");

  var row = tableRef.insertRow(tableRef.rows.length);

  var cell0 = row.insertCell(0);

  cell0.innerHTML =
    "<td><input name='attunement" + rows_attunements + "' type='text' /></td>";

  rows_attunements += 1;
  $("[name='rows_attunements']").val(rows_attunements);
}

function remove_last_row(tableId) {
  var tableRef = document.getElementById(tableId);
  var rowCount = tableRef.rows.length;
  tableRef.deleteRow(rowCount - 1);

  switch (tableId) {
    case "attacktable":
      rows_attacks -= 1;
      if (rows_attacks < 0) {
        rows_attacks = 0;
      }
      break;
    case "attunementtable":
      rows_attunements -= 1;
      if (rows_attunements < 0) {
        rows_attunements = 0;
      }
      break;
    case "inventorytable":
      rows_inventory -= 1;
      if (rows_inventory < 0) {
        rows_inventory = 0;
      }
      break;
    case "spelltable":
      rows_spells -= 1;
      if (rows_spells < 0) {
        rows_spells = 0;
      }
      break;
  }
  $("[name='rows_attacks']").val(rows_attacks);
  $("[name='rows_attunements']").val(rows_attunements);
  $("[name='rows_inventory']").val(rows_inventory);
  $("[name='rows_spells']").val(rows_spells);
}

function calc_carry_weight() {
  var total = 0;
  var table = document.getElementById("inventorytable");
  var trs = table.getElementsByTagName("tr");
  for (var i = 0; i < trs.length; i++) {
    var tds = trs[i].getElementsByTagName("td");

    var count_str = tds[2].getElementsByTagName("input")[0].value;
    var weight_str = tds[3].getElementsByTagName("input")[0].value;

    var count = isNaN(parseFloat(count_str)) ? 0 : parseFloat(count_str);
    var weight = isNaN(parseFloat(weight_str)) ? 0 : parseFloat(weight_str);

    console.log(count + " * " + weight + " = " + count * weight);
    total += count * weight;
  }
  document.getElementById("weightcarried").value = parseInt(total + 0.5);
}

function checkContent(e, t, n, a = !0, r = null) {
  if ("class" == t) {
    if (null != r) var l = r.contentDocument.getElementsByTagName(e);
    else var l = document.getElementsByTagName(e);
    for (var g = [], h = 0; h < l.length; h++)
      try {
        for (var s = l[h].classList, m = 0; m < s.length; m++)
          a ? s[m] == n && g.push(l[h]) : s[m].includes(n) && g.push(l[h]);
      } catch {}
    if (null == r) {
      for (
        var u = [], c = 0;
        c < document.getElementsByTagName("iframe").length;
        c++
      )
        try {
          u[u.length] = checkContent(
            e,
            t,
            n,
            a,
            document.getElementsByTagName("iframe")[c]
          );
        } catch (f) {}
      for (var o = 0; o < u.length; o++)
        for (var h = 0; h < u[o].length; h++) g.push(u[o][h]);
    }
    return g;
  }
  var i = [];
  if (null != r) var v = r.contentDocument.getElementsByTagName(e);
  else var v = document.getElementsByTagName(e);
  for (var o = 0; o < v.length; o++)
    (v[o].hasAttribute(t) || "" == t) &&
      (a
        ? (v[o].getAttribute(t) == n || "" == t) && i.push(v[o])
        : "" == t
        ? i.push(v[o])
        : v[o].getAttribute(t).includes(n) && i.push(v[o]));
  if (null == r) {
    for (
      var u = [], c = 0;
      c < document.getElementsByTagName("iframe").length;
      c++
    )
      try {
        u[u.length] = checkContent(
          e,
          t,
          n,
          a,
          document.getElementsByTagName("iframe")[c]
        );
      } catch {}
    for (var o = 0; o < u.length; o++)
      for (var h = 0; h < u[o].length; h++) i.push(u[o][h]);
  }
  return i;
}
