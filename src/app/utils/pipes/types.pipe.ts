import {
  Pipe,
  PipeTransform,
  ɵbypassSanitizationTrustHtml,
} from '@angular/core';
import { CardSymbol, Symbology } from 'scryfall-sdk';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'type',
})
export class Types implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  public symbolsToReturn: string = '';
  public symbolsList: CardSymbol[] = [];

  public removeEmptyObjects(array: string[]) {
    return array.filter((obj) => Object.keys(obj).length !== 0);
  }

  public getTypes(value: string) {
    const types: { [x: string]: string } = {
      '`—`': '',
      ' // ': '',
      '//': '',
      ' ': '',
      Artifact: '🔧',
      Enchantment: '📜',
      Creature: '👤',
      Planeswalker: '🌎',
      Instant: '🚀',
      Sorcery: '🔮',
      Land: '🏞️',
      // ==== Artifacts Types
      Attraction: '💕',
      Blood: '🔪',
      Clue: '🕵️‍♂️',
      Contraption: '🛠️',
      Equipment: '🛡️',
      Food: '🍔',
      Fortification: '🏰',
      Gold: '💰',
      Incubator: '🐣',
      Key: '🔑',
      Powerstone: '💎',
      Treasure: '🏴‍☠️',
      Vehicle: '🚗',
      //======== Enchantment Types
      Aura: '✨',
      Cartouche: '📜',
      Curse: '👻',
      Rune: '🧿',
      Background: '🌅',
      Class: '🎓',
      Saga: '📖',
      Shrine: '⛩️',
      Shard: '💎',
      //========= Creature Types / Trybes
      Advisor: '👨‍🏫',
      Aetherborn: '🧛‍♂️',
      Alien: '👽',
      Ally: '🤝',
      Angel: '👼',
      Antelope: '🦌',
      Ape: '🦍',
      Archer: '🏹',
      Archon: '👑',
      Army: '🎖️',
      Artificer: '🧰',
      Assassin: '🗡️',
      'Assembly-Worker': '👷‍♂️',
      Astartes: '🐺',
      Atog: '🐖',
      Aurochs: '🐂',
      Avatar: '🤖',
      Azra: '🧟',
      Badger: '🦡',
      Balloon: '🎈',
      Barbarian: '🗡️',
      Bard: '🎵',
      Basilisk: '🐍',
      Bat: '🦇',
      Bear: '🐻',
      Beast: '🐺',
      Beeble: '🐝',
      Beholder: '👁️',
      Berserker: '💥',
      Bird: '🐦',
      Blinkmoth: '🦋',
      Boar: '🐗',
      Bringer: '☀️',
      Brushwagg: '🐊',
      Camarid: '🦐',
      Camel: '🐫',
      Caribou: '🦌',
      Carrier: '🐜',
      Cat: '🐱',
      Centaur: '🐴',
      Cephalid: '🦑',
      Child: '🧒',
      Chimera: '🦁',
      Citizen: '👨‍👩‍👧‍👦',
      Cleric: '🙏',
      Clown: '🤡',
      Cockatrice: '🐔',
      Construct: '🤖',
      Coward: '🐄',
      Crab: '🦀',
      Crocodile: '🐊',
      Ctan: '💀',
      Custodes: '🗡️',
      Cyclops: '👁️',
      Dauthi: '😈',
      DemigoD: '🦸',
      Demon: '👿',
      Deserter: '🏃‍♂️',
      Devil: '👹',
      Dinosaur: '🦕',
      Djinn: '🧞',
      Dog: '🐶',
      Dragon: '🐲',
      Drake: '🐉',
      Dreadnought: '🚢',
      Drone: '🚁',
      Druid: '🌳',
      Dryad: '🧚‍♀️',
      Dwarf: '🧝‍♂️',
      Efreet: '😈',
      Egg: '🥚',
      Elder: '👴🏻',
      Eldrazi: '👽',
      Elemental: '🌪️',
      Elephant: '🐘',
      Elf: '🧝',
      Elk: '🦌',
      Employee: '👨‍💼',
      Eye: '👁️',
      Faerie: '🧚',
      Ferret: '🐹',
      Fish: '🐟',
      Flagbearer: '🚩',
      Fox: '🦊',
      Fractal: '🌀',
      Frog: '🐸',
      Fungus: '🍄',
      Gamer: '🎮',
      Gargoyle: '🦇',
      Germ: '🦠',
      Giant: '🗿',
      Gith: '🗡️',
      Gnoll: '🐺',
      Gnome: '🧝‍♂️',
      Goat: '🐐',
      Goblin: '👹',
      God: '🙏',
      Golem: '🤖',
      Gorgon: '🐍',
      Graveborn: '💀',
      Gremlin: '🤏',
      Griffin: '🦅',
      Guest: '🧳',
      Hag: '🧙',
      Halfling: '🍺',
      Hamster: '🐹',
      Harpy: '🦅',
      Hellion: '🔥',
      Hippo: '🦛',
      Hippogriff: '🦄',
      Homarid: '🦐',
      Homunculus: '🧑‍🔬',
      Horror: '👻',
      Horse: '🐎',
      Human: '👤',
      Hydra: '🐲',
      Hyena: '🐆',
      Illusion: '🌌',
      Imp: '👿',
      Incarnation: '🙏',
      Inkling: '🦑',
      Inquisitor: '🔍',
      Insect: '🐞',
      Jackal: '🐕',
      Jellyfish: '🎐',
      Juggernaut: '🚂',
      Kavu: '🦖',
      Kirin: '🦌',
      Kithkin: '🧝‍♀️',
      Knight: '🗡️',
      Kobold: '🐉',
      Kor: '🗡️',
      Kraken: '🦑',
      Lamia: '🐍',
      Lammasu: '🦁',
      Leech: '🐛',
      Leviathan: '🐋',
      Lhurgoyf: '🦖',
      Licid: '🦟',
      Lizard: '🦎',
      Manticore: '🦁',
      Masticore: '🦔',
      Mercenary: '💰',
      Merfolk: '🧜',
      Metathran: '🤖',
      Minion: '👥',
      Minotaur: '🐂',
      Mite: '🦟',
      Mole: '🦔',
      Monger: '🤝',
      Mongoose: '🐭',
      Monk: '🙏',
      Monkey: '🐵',
      Moonfolk: '🌕',
      Mouse: '🐁',
      Mutant: '🧬',
      Myr: '🤖',
      Mystic: '🔮',
      Naga: '🐍',
      Nautilus: '🐚',
      Necron: '💀',
      Nephilim: '👹',
      Nightmare: '👻',
      Nightstalker: '🌙',
      Ninja: '🥷',
      Noble: '👸',
      Noggle: '🙃',
      Nomad: '🏜️',
      Nymph: '👩‍🦰',
      Octopus: '🐙',
      Ogre: '👹',
      Ooze: '🦠',
      Orb: '🔴',
      Orc: '👺',
      Orgg: '🐷',
      Otter: '🦦',
      Ouphe: '🧚‍♂️',
      Ox: '🐂',
      Oyster: '🦪',
      Pangolin: '🐾',
      Peasant: '👨‍🌾',
      Pegasus: '🦄',
      Pentavite: '🔺',
      Performer: '🎭',
      Pest: '🐜',
      Phelddagrif: '🦛',
      Phoenix: '🔥',
      Phyrexian: '🤖🦠',
      Pilot: '✈️',
      Pincher: '🦀',
      Pirate: '☠️',
      Plant: '🌱',
      Praetor: '🗡️',
      Primarch: '🎖️',
      Prism: '🔶',
      Processor: '🤖',
      Raccoon: '🦝',
      Rabbit: '🐰',
      Ranger: '🏹',
      Rat: '🐀',
      Rebel: '👊',
      Reflection: '👤',
      Rhino: '🦏',
      Rigger: '🛠️',
      Robot: '🤖',
      Rogue: '🗡️',
      Sable: '🦨',
      Salamander: '🦎',
      Samurai: '🗡️',
      Sand: '🏜️',
      Saproling: '🌱',
      Satyr: '🎭',
      Scarecrow: '🌽',
      Scion: '🐲',
      Scorpion: '🦂',
      Scout: '🔎',
      Sculpture: '🗿',
      Serf: '👷',
      Serpent: '🐍',
      Servo: '🤖',
      Shade: '🌑',
      Shaman: '🧙',
      Shapeshifter: '🦄',
      Shark: '🦈',
      Sheep: '🐑',
      Siren: '🧜‍♀️',
      Skeleton: '💀',
      Slith: '🐍',
      Sliver: '🐍',
      Slug: '🐌',
      Snake: '🐍',
      Soldier: '👨‍✈️',
      Soltari: '🏃‍♂️',
      Spawn: '🥚',
      Specter: '👻',
      Spellshaper: '🔮',
      Sphinx: '🦁',
      Spider: '🕷️',
      Spike: '🌵',
      Spirit: '👻',
      Splinter: '🌳',
      Sponge: '🧽',
      Squid: '🦑',
      Squirrel: '🐿️',
      Starfish: '🌟',
      Surrakar: '🌊',
      Survivor: '🧟',
      Tentacle: '🐙',
      Tetravite: '🔺',
      Thalakos: '👽',
      Thopter: '🚁',
      Thrull: '🤢',
      Tiefling: '👹',
      Treefolk: '🌳',
      Trilobite: '🐚',
      Triskelavite: '🌀',
      Troll: '👹',
      Turtle: '🐢',
      Tyranid: '👾',
      Unicorn: '🦄',
      Vampire: '🧛',
      Vedalken: '🧐',
      Viashino: '🦎',
      Volver: '🦕',
      Wall: '🧱',
      Walrus: '🦭',
      Warlock: '🧙‍♂️',
      Warrior: '🗡️',
      Weird: '👽',
      Werewolf: '🐺',
      Whale: '🐋',
      Wizard: '🧙‍♂️',
      Wolf: '🐺',
      Wolverine: '🦡',
      Wombat: '🐻',
      Worm: '🐛',
      Wraith: '👻',
      Wurm: '🐉',
      Yeti: '❄️',
      Zombie: '🧟',
      Zubera: '🕯️',
      //=====Planeswalker Types
      Ajani: '😺',
      Aminatou: '🔮',
      Angrath: '🔥',
      Arlinn: '🐺',
      Ashiok: '💤',
      Bahamut: '🐲',
      Basri: '🛡️',
      Bolas: '🐉',
      Calix: '🏺',
      Chandra: '🔥',
      Comet: '☄️',
      Dack: '🃏',
      Dakkon: '⚔️',
      Daretti: '🛠️',
      Davriel: '📚',
      Dihada: '🎭',
      Domri: '🐻',
      Dovin: '👔',
      Ellywick: '🧝',
      Elminster: '🧙',
      Elspeth: '⚔️',
      Estrid: '🌀',
      Freyalise: '🍃',
      Garruk: '🐺',
      Gideon: '🛡️',
      Grist: '🪵',
      Huatli: '🐊',
      Jace: '🧠',
      Jaya: '🔥',
      Jared: '👑',
      Jeska: '🔥',
      Kaito: '🎎',
      Karn: '🤖',
      Kasmina: '🎓',
      Kaya: '🗡️',
      Kiora: '🌊',
      Koth: '⛰️',
      Liliana: '💀',
      Lolth: '🕸️',
      Lukka: '🐯',
      Minsc: '⚔️',
      Mordenkainen: '🧙',
      Nahiri: '⚒️',
      Narset: '📜',
      Niko: '🏹',
      Nissa: '🌳',
      Nixilis: '🏴',
      Oko: '🦌',
      Ral: '⚡',
      Rowan: '🗡️',
      Saheeli: '🛠️',
      Samut: '🏜️',
      Sarkhan: '🐲',
      Serra: '👼',
      Sivitri: '🐲',
      Sorin: '🩸',
      Szat: '🔮',
      Tamiyo: '📖',
      Tasha: '🧙',
      Teferi: '⏳',
      Teyo: '🛡️',
      Tezzeret: '🛠️',
      Tibalt: '🔥',
      Tyvar: '🪓',
      Ugin: '🐲',
      Urza: '🤖',
      Venser: '🌀',
      Vivien: '🏹',
      Vraska: '🐍',
      Will: '🌌',
      Windgrace: '🌿',
      Wrenn: '🌳',
      Xenagos: '🦍',
      Yanggu: '🐉',
      Yanling: '🌪️',
      Zariel: '👿',
      // ===== Creatures Class Types
      Brainiac: '🧠',
      Bureaucrat: '💼',
      Designer: '🎨',
      Fighter: '🥊',
      Grandchild: '👶🏼',
      Hatificer: '👒',
      Head: '💆‍♂️',
      Hero: '🦸',
      LadyofProperEtiquette: '👸',
      Lord: '👑',
      Mime: '🤡',
      Paratrooper: '🪂',
      Scientist: '👨‍🔬',
      Spy: '🕵️‍♀️',
      Townsfolk: '👨‍🌾',
      Villain: '🦹‍♂️',
      Waiter: '🍽️',
      Wrestler: '🤼',
      Alchemist: '🧪',
      Bodyguard: '💪',
      Guardian: '🛡️',
      Mage: '🧙',
      Tactician: '🎖️',
      Witch: '🧙‍♀️',
      //====== Supertypes
      Artifacts: '🛡️',
      Creatures: '🐲',
      Enchantments: '🌟',
      Instants: '⚡',
      Lands: '🏞️',
      Planeswalkers: '🧙',
      Sorceries: '🔮',
      Tribals: '🏹',
      Dungeons: '🏰',
      Battles: '⚔️',
      Planes: '✈️',
      Phenomena: '🌀',
      Vanguard: '🛡️🗡️',
      Scheme: '🤫',
      Conspiracies: '🕵️‍♂️',
      Conspiracy: '🕵️‍♂️',

      //=== Rarity
      Legendary: '👑',
      Token: '🔶',
      //====Missed Types:
      World: '🌍',
      Plains: '🌾',
      Forest: '🌲',
      Island: '🏝️',
      Swamp: '🌫️',
      Mountain: '⛰️',
      Trap: '🪤',
    };
    return types[value];
  }

  async transform(
    value: string | null | undefined,
    event?: any
  ): Promise<SafeHtml> {
    if (value) {
      let stringValues = value.split(/\b/g);
      stringValues = this.removeEmptyObjects(stringValues);
      stringValues.forEach((element) => {
        if (element !== ' — ') {
          this.symbolsToReturn =
            this.symbolsToReturn + ' ' + this.getTypes(element) + ' ';
        }
      });
    }
    return this._sanitizer.bypassSecurityTrustHtml(this.symbolsToReturn);
  }
}
