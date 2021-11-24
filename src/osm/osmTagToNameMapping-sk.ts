import { OsmTagToNameMapping } from './osmTagToNameMappingType';

export const osmTagToNameMapping: OsmTagToNameMapping = {
  aeroway: {
    aerodrome: 'Letisko',
  },
  aerialway: 'Lanovka, vlek',
  amenity: {
    '*': '{}',
    animal_breeding: 'Chov zvierat',
    animal_shelter: 'Prístrešok pre zvieratá',
    arts_centre: 'Centrum umenia',
    atm: 'Bankomat',
    bank: 'Banka',
    bar: 'Bar',
    bbq: 'Gril',
    bench: 'Lavička',
    bicycle_parking: 'Parkovanie pre bicykle',
    bicycle_rental: 'Požičovňa bicyklov',
    bicycle_repair_station: 'Stojan na opravu bicyklov',
    biergarten: 'Pivná záhradka',
    brothel: 'Nevestinec',
    bureau_de_change: 'Zmenáreň',
    bus_station: 'Autobusová stanica',
    cafe: 'Kaviareň',
    car_rental: 'Požičovňa áut',
    car_wash: 'Autoumývarka',
    casino: 'Kasíno',
    charging_station: 'Nabíjacia stanica',
    childcare: 'Starostlivosť o deti',
    cinema: 'Kino',
    clinic: 'Poliklinika',
    clock: 'Hodiny',
    college: 'Stredná škola',
    community_centre: 'Komunitné centrum',
    compressed_air: 'Kompresor (na pneumatiky)',
    courthouse: 'Súd',
    dentist: 'Zubná ambulancia',
    device_charging_station: 'Nabíjacia stanica elektrovozidiel',
    doctors: 'Všeobecný lekár',
    dressing_room: 'Šatňa',
    drinking_water: 'Pitná voda',
    driving_school: 'Autoškola',
    embassy: 'Ambasáda',
    events_venue: 'Miesto konania podujatí',
    fast_food: 'Rýchle občerstvenie',
    feeding_place: 'Krmelec',
    ferry_terminal: 'Terminál trajektu',
    fire_station: 'Hasičská stanica',
    food_court: 'Food court',
    fountain: 'Fontána',
    fuel: 'Čerpacia stanica',
    funeral_hall: 'Pohrebná sieň',
    gambling: 'Herňa',
    game_feeding: 'Krmelec',
    grave_yard: 'Pohrebisko',
    grit_bin: 'Nádoba s posypom',
    hospital: 'Nemocnica',
    hunting_stand: 'Poľovnícky posed',
    ice_cream: 'Zmrzlina',
    kindergarten: 'Materská škola',
    language_school: 'Jazyková škola',
    library: 'Knižnica',
    marketplace: 'Trhovisko',
    monastery: 'Kláštor',
    money_transfer: 'Prevod peňazí',
    motorcycle_parking: 'Parkovanie motocyklov',
    motorcycle_rental: 'Požičovňa motocyklov',
    nightclub: 'Nočný klub',
    parking: 'Parkovanie',
    parking_entrance: 'Vjazd/výjazd parkoviska',
    parking_space: 'Parkovacie miesto',
    pharmacy: 'Lekáreň',
    place_of_mourning: 'Dom smútku',
    place_of_worship: 'Miesto náboženských obradov',
    planetarium: 'Planetárium',
    police: 'Polícia',
    post_box: 'Poštová schránka',
    post_office: 'Pošta',
    prison: 'Väznica',
    pub: 'Hostinec',
    public_bookcase: 'Verejná knižnica',
    ranger_station: 'Strážcovská stanica',
    recycling: 'Recyklovanie',
    restaurant: 'Reštaurácia',
    school: 'Škola',
    shelter: {
      '*': 'Prístrešok',
      shelter_type: {
        '*': 'Prístrešok {}',
        basic_hut: 'Jednoduchá chata, bivak',
        changing_rooms: 'Prezliekáreň',
        field_shelter: 'Poľný prístrešok',
        lean_to: 'Prístrešok s otvorenou stenou',
        picnic_shelter: 'Piknikový prístrešok',
        public_transport: 'Prístrešok verejnej dopravy',
        rock_shelter: 'Skalný úkryt',
        sun_shelter: 'Prístrešok proti slnku',
        weather_shelter: 'Prístrešok proti nepriaznivému počasiu',
      },
    },
    shower: 'Sprcha',
    ski_rental: 'Požičovňa lyží',
    smoking_area: 'Fajčiarska zóna',
    social_centre: 'Sociálne centrum',
    social_facility: {
      '*': 'Sociálne zariadenie',
      social_facility: {
        ambulatory_care: 'Zariadenie ambulantnej starostlivosti',
        assisted_living: 'Zariadenie pre život s pomocou',
        clothing_bank: 'Odevná banka',
        day_care: 'Zariadenie dennej starostlivosti',
        food_bank: 'Potravinová banka',
        group_home: 'Skupinové bývanie',
        hospice: 'Hospic',
        nursing_home: 'Dom s opatrovateľskou službou',
        shelter: 'Nocľaháreň',
        soup_kitchen: 'Vývarovňa',
        workshop: 'Chránená dielňa',
      },
    },
    stripclub: 'Striptízový bar',
    studio: 'Štúdio',
    taxi: 'Taxi',
    telephone: 'Telefón',
    theatre: 'Divadlo',
    toilets: 'WC',
    townhall: 'Mestská radnica, obecný úrad',
    traffic_park: 'Dopravné ihrisko',
    trolley_bay: 'Priestor pre vozíky',
    university: 'Univerzita',
    vacuum_cleaner: 'Vysávač',
    vehicle_inspection: 'STK',
    vending_machine: 'Automat',
    veterinary: 'Veterinár',
    waste_basket: 'Odpadkový kôš',
    waste_disposal: 'Likvidácia odpadu',
    water_point: 'Odber pitnej vody',
    watering_place: 'Napájadlo',
  },
  barrier: {
    '*': 'Bariéra {}',
    block: 'Blok',
    bollard: 'Stĺpik',
    border_control: 'Hraničná kontrola',
    cable_barrier: 'Káblové zvodidlo',
    chain: 'Reťaz',
    city_wall: 'Hradba',
    ditch: 'Priekopa',
    entrance: 'Vstup',
    fence: 'Plot',
    gate: 'Brána',
    guard_rail: 'Zvodidlá',
    handrail: 'Zábradlie',
    hedge: 'Živý plot',
    kerb: 'Obrubník',
    lift_gate: 'Závora',
    rope: 'Lano',
    sliding_gate: 'Posuvná brána',
    swing_gate: 'Otočná závora',
    turnstile: 'Turniket',
    wall: 'Múr',
  },
  boundary: {
    '*': 'Oblasť',
    administrative: {
      '*': 'Administratívna oblasť',
      admin_level: {
        '2': 'Štát',
        '3': 'Región',
        '4': 'Kraj',
        '5': 'Provincia',
        '6': 'Mesto',
        '7': 'Oblasť',
        '8': 'Okres',
        '9': 'Obec',
        '10': 'Katastrálne územie',
      },
    },
    national_park: 'Národný park',
    protected_area: 'Chránená oblasť',
  },
  building: {
    '*': 'Budova {}',
    apartments: 'Apartmány (blok)',
    barn: 'Stodola',
    bungalow: 'Bungalov',
    bunker: 'Bunker',
    cabin: 'Búda, chatka',
    cathedral: 'Katedrála',
    chapel: 'Kaplnka',
    church: 'Kostol',
    civic: 'Verejná budova',
    collapsed: 'Zrútena budova',
    commercial: 'Budova určená na komerčné účely',
    construction: 'Výstavba budovy',
    cowshed: 'Kravín',
    detached: 'Samostatne stojaci rodinný dom',
    dormitory: 'Internát',
    entrance: 'Vstup do budovy',
    farm_auxiliary: 'Pomocná budova farmy',
    farm: 'Statok',
    garage: 'Garáž',
    garages: 'Garáže',
    government: 'Vládna budova',
    grandstand: 'Tribúna',
    greenhouse: 'Sklenník',
    hangar: 'Hangár',
    hayloft: 'Senník',
    hospital: 'Budova nemocnice',
    hotel: 'Budova hotela',
    house: 'Rodinný dom',
    houseboat: 'Hausbót',
    hut: 'Hut',
    industrial: 'Budova určená na priemyselné účely',
    kindergarten: 'Budova materskej školy',
    kiosk: 'Kiosk',
    manufacture: 'Manufacture budova',
    mosque: 'Mešita',
    office: 'Budova s kanceláriami',
    parking: 'Budova parkovania',
    public: 'Verejná budova',
    residential: 'Obytný dom',
    retail: 'Budova predajne',
    roof: 'Strecha',
    ruins: 'Ruiny budovy',
    school: 'Budova školy',
    semidetached_house: 'Dvojdom',
    service: 'Servisná budova',
    shed: 'Kôlňa',
    shrine: 'Svätyňa',
    stable: 'Stajňa',
    static_caravan: 'Obytný príves, karavan',
    storage_tank: 'Cisterna',
    sty: 'Chlievik',
    supermarket: 'Supermarket budova',
    synagogue: 'Synagóga',
    temple: 'Chrám',
    terrace: 'Radový dom',
    train_station: 'Vlaková stanica',
    transformer_tower: 'Transformer tower',
    transportation: 'Budova prepravy',
    university: 'Budova univerzity',
    warehouse: 'Sklad',
    yes: 'Budova',
  },
  highway: {
    '*': 'Cesta {}',
    bus_stop: 'Autobusová zastávka',
    construction: 'Cesta vo výstavbe',
    crossing: 'Priechod',
    cycleway: 'Cyklochodník',
    footway: 'Chodník',
    living_street: 'Obytná zóna',
    motorway: 'Diaľnica',
    motorway_link: 'Napojenie na diaľnicu',
    path: 'Cestička',
    pedestrian: 'Pešia zóna',
    primary: 'Cesta prvej triedy',
    primary_link: 'Napojenie na cestu prvej triedy',
    residential: 'Ulica',
    secondary: 'Cesta druhej triedy',
    secondaty_link: 'Napojenie na cestu druhej triedy',
    service: {
      '*': 'Servisná, príjazdová cesta',
      service: {
        '*': 'Servisná cesta {}',
        alley: 'Prejazdová cesta',
        bus: 'Cesta vyhradená pre autobus',
        'drive-through': 'Cesta pre nákup z auta',
        driveway: 'Príjazdová cesta',
        emergency_access: 'Požiarna cesta',
        parking_aisle: 'Cesta na parkovisku',
      },
    },
    steps: 'Schody',
    street_lamp: 'Pouličné osvetlenie',
    tertiary: 'Cesta tretej triedy',
    tertiary_link: 'Napojenie na cestu tretej triedy',
    track: {
      '*': 'Lesná / poľná cesta',
      tracktype: {
        grade1: 'Spevnená lesná / poľná cesta',
        grade2: 'Prevažne spevnená lesná / poľná cesta',
        grade3: 'Menej pevná lesná / poľná cesta',
        grade4: 'Prevažne mäkká lesná / poľná cesta',
        grade5: 'Mäkká lesná / poľná cesta',
      },
    },
    trunk: 'Cesta pre motorové vozidlá',
    trunk_link: 'Napojenie na cestu pre motorové vozidlá',
    unclassified: 'Neklasifikovaná cesta',
  },
  historic: {
    '*': 'Historický objekt',
    archaeological_site: 'Archeologické nálezisko',
    castle: 'Hrad',
    church: 'Historický kostol',
    city_gate: 'Mestská brána',
    manor: 'Panstvo',
    memorial: 'Pamätník',
    monastery: 'Kláštor',
    monument: 'Pomník, monument',
    ruins: {
      '*': 'Ruiny',
      ruins: {
        castle: 'Zrúcanina hradu',
      },
    },
    tomb: 'Hrobka',
    wayside_cross: 'Prícestný kríž',
    wayside_shrine: 'Božia muka',
  },
  landuse: {
    '*': '{}',
    allotments: 'Záhradkárska oblasť',
    brownfield: 'Miesto na novú výstavbu',
    cemetery: 'Cintorín',
    commercial: 'Komerčná zóna',
    construction: 'Stavenisko',
    farmland: 'Pole',
    farmyard: 'Družstvo',
    forest: 'Hospodársky les',
    garages: 'Garáže',
    grass: 'Tráva',
    greenfield: 'Nové miesto na výstavbu',
    industrial: 'Priemyselná zóna',
    landfill: 'Skládka',
    meadow: 'Lúka',
    military: 'Vojenská oblasť',
    orchard: 'Sad',
    plant_nursery: 'Lesná škôlka',
    quarry: 'Lom',
    recreation_ground: 'Oddychová zóna',
    religions: 'Cirkevný pozemok',
    reservoir: 'Priehrada / nádrž',
    residential: 'Rezidenčná zóna',
    retail: 'Nákupná zóna',
    vineyard: 'Vinica',
    winter_sports: 'Miesto zimných športov',
  },
  leisure: {
    '*': '{}',
    dog_park: 'Park pre psy',
    firepit: 'Ohnisko',
    fishing: 'Miesto na rybárčenie',
    fitness_centre: 'Fitness centrum',
    fitness_station: 'Fitness stanica',
    garden: 'Záhrada',
    golf_course: 'Golfové ihrisko',
    horse_riding: 'Jazdenie na koni',
    nature_reserve: 'Prírodná rezervácia',
    park: 'Park',
    picnic_table: 'Piknikový stôl',
    pitch: {
      '*': 'Ihrisko',
      sport: {
        badminton: 'Bedmintonové ihrisko',
        basketball: 'Basketbalové ihrisko',
        beachvolleyball: 'Ihrisko plážoveho volejbalu',
        hockey: 'Hokejové ihrisko',
        ice_hockey: 'Ihrisko ľadového hokeja',
        multi: 'Viacúčelové ihrisko',
        soccer: 'Futbalové ihrisko',
        tennis: 'Tenisové ihrisko',
        volleyball: 'Volejbalové ihrisko',
      },
    },
    playground: 'Detské ihrisko',
    sports_centre: 'Športové centrum',
    sports_hall: 'Športová hala',
    stadium: 'Štadión',
    swimming_pool: 'Bazén',
    track: 'Dráha',
    water_park: 'Akvapark',
  },
  man_made: {
    '*': '{}',
    adit: 'Banská štôlňa',
    antenna: 'Anténa',
    beacon: 'Maják',
    beehive: 'Úľ',
    bridge: 'Most',
    bunker_silo: 'Silo',
    cairn: 'Kamenný mužík',
    cellar_entrance: 'Pivničný vchod',
    chimney: 'Komín',
    clearcut: 'Rúbanisko',
    communications_tower: 'Komunikačná veža',
    cooling_tower: 'Chladiacia veža',
    crane: 'Žeriav',
    cross: 'Kríž',
    cutline: 'Priesek',
    dyke: 'Hrádza',
    embankment: 'Násyp',
    flagpole: 'Vlajkový stožiar',
    "forester's_lodge": 'Horáreň',
    gasometer: 'Plynomer',
    goods_conveyor: 'Dopravný pás',
    groyne: 'Krátka pobrežná hrádza',
    lighthouse: 'Maják',
    manhole: 'Šachta',
    mast: 'Stožiar',
    mineshaft: 'Banská šachta',
    monitoring_station: 'Monitorovacia stanica',
    nesting_site: 'Hniezdo',
    observatory: 'Observatórium',
    pier: 'Mólo',
    pipeline: 'Potrubie',
    reservoir_covered: 'Krytý rezervoár',
    silo: 'Silo',
    snow_cannon: 'Snežné delo',
    spoil_heap: 'Halda',
    spring_box: 'Kryt prameňa',
    storage_tank: 'Skladovacia cisterna',
    street_cabinet: 'Pouličná skriňa',
    surveillance: 'Bezpečnostná kamera',
    survey_point: 'Geodetický bod',
    telescope: 'Teleskop',
    tower: {
      '*': 'Veža',
      'tower:type': {
        bell_tower: 'Zvonica',
        communication: 'Telekomunikačná veža',
        cooling: 'Chladiarenska veža',
        observation: 'Vyhliadková veža',
      },
    },
    utility_pole: 'Úžitkový stožiar',
    wastewater_plant: 'Čistička odpadových vôd',
    water_tap: 'Vodovodný kohútik',
    water_tower: 'Vodárenská veža',
    water_well: 'Studňa',
    water_works: 'Vodohospodársky objekt',
    watermill: 'Vodný mlyn',
    windmill: 'Veterný mlyn',
    works: 'Fabrika',
  },
  natural: {
    '*': '{}',
    arch: 'Skalné okno',
    bare_rock: 'Holá skala',
    basin: 'Kotlina',
    bay: 'Zátoka',
    beach: 'Pláž',
    birds_nest: 'Vtáčie hniezdo',
    cave_entrance: 'Jaskyňa',
    cliff: 'Bralo',
    earth_bank: 'Svah',
    fell: 'Bažina',
    geyser: 'Gejzír',
    glacier: 'Ľadovec',
    grassland: 'Trávnatá vegetácia',
    gully: 'Roklina',
    heath: 'Step',
    hot_spring: 'Termálny prameň',
    landslide: 'Zosuv pôdy',
    mountain_range: 'Pohorie',
    mud: 'Blato',
    peak: 'Vrchol',
    plateau: 'Planina',
    ridge: 'Hrebeň',
    rock: 'Skala',
    saddle: 'Sedlo',
    sand: 'Piesok',
    scree: 'Suťovisko',
    scrub: 'Kríky',
    shingle: 'Štrk (vodný)',
    shrub: 'Krík',
    sinkhole: 'Závrt',
    spring: 'Prameň',
    stone: 'Balvan',
    tree: 'Strom',
    tree_row: 'Stromoradie / vetrolam',
    valley: 'Dolina',
    water: 'Vodná plocha',
    wetland: 'Mokraď',
    wood: 'Les',
  },
  place: {
    '*': 'Miesto {}',
    city: 'Veľkomesto',
    country: 'Krajina',
    farm: 'Farma',
    hamlet: 'Osada',
    island: 'Ostrov',
    islet: 'Ostrovček',
    isolated_dwelling: 'Samota',
    locality: 'Lokalita',
    ocean: 'Oceán',
    sea: 'More',
    square: 'Námestie',
    state: 'Štát',
    suburb: 'Predmestie',
    town: 'Mesto',
    village: 'Dedina',
  },
  power: {
    '*': '{}',
    generator: 'Generátor',
    line: 'Elektrické vedenie',
    minor_line: 'Malé elektrické vedenie',
    plant: 'Elektráreň',
    pole: 'Elektrický stĺp',
    substation: 'Elektrická distribučná stanica',
    tower: 'Veža vysokého napätia',
    transformer: 'Transformátor',
  },
  public_transport: {
    platform: 'Nástupište',
    station: 'Stanica',
    stop_position: 'Zastávka',
  },
  railway: 'Železnica',
  shop: {
    '*': 'Obchod {}',
    alcohol: 'Obchod s alkoholom',
    antiques: 'Starožitnosti',
    art: 'Obchod s umením',
    baby_goods: 'Detské potreby',
    bag: 'Predaj kabeliek',
    bakery: 'Pekáreň',
    bathroom_furnishing: 'Kúpeľňové štúdio',
    beauty: 'Kozmetický salón',
    bed: 'Predaj postelí a matracov',
    beverages: 'Obchod s nápojmi',
    bicycle: 'Predaj bicyklov',
    bookmaker: 'Stávková kancelária',
    books: 'Kníhkupectvo',
    boutique: 'Butik',
    butcher: 'Mäsiareň',
    camera: 'Predaj fotoaparátov',
    car: 'Predaj áut',
    car_parts: 'Predaj autosúčiastok',
    car_repair: 'Autoservis',
    carpet: 'Predaj kobercov',
    cheese: 'Predaj syrov',
    chemist: 'Drogéria',
    clothes: 'Odevy',
    coffee: 'Predajňa kávy',
    collector: 'Obchod pre zberateľov',
    computer: 'Počítačový obchod',
    confectionery: 'Cukráreň',
    convenience: 'Potraviny',
    copyshop: 'Copy centrum',
    cosmetics: 'Obchod s kozmetikou',
    craft: 'Obchod s potrebami pre umelcov a remeselníkov',
    curtain: 'Predajňa záclon a závesov',
    dairy: 'Mliečne výrobky',
    deli: 'Lahôdky',
    department_store: 'Obchodný dom',
    doityourself: 'Urob si sám',
    doors: 'Predaj dverí',
    dry_cleaning: 'Čistiareň',
    'e-cigarette': 'E-cigarety',
    electrical: 'Elektroinštalačný materiál',
    electronics: 'Elektro',
    erotic: 'Sexshop',
    fabric: 'Metrový textil',
    farm: 'Predaj na farme',
    fireplace: 'Predaj krbov',
    fishing: 'Rybárske potreby',
    flooring: 'Predaj podláh',
    florist: 'Kvetinárstvo',
    funeral_directors: 'Pohrebná služba',
    furniture: 'Predaj nábytku',
    games: 'Obchod s hrami',
    garden_center: 'Záhradné centrum',
    garden_centre: 'Záhradné centrum',
    general: 'Zmiešaný tovar',
    gift: 'Suveníry',
    glaziery: 'Sklenár',
    greengrocer: 'Ovocie a zelenina',
    hairdresser: 'Kaderníctvo, holičstvo',
    hardware: 'Železiarstvo',
    health_food: 'Predaj zdravého jedla',
    hifi: 'Obchod s Hi-fi',
    houseware: 'Domáce potreby',
    hunting: 'Lovecké potreby',
    ice_cream: 'Zmrzlina',
    interior_decoration: 'Interiérové dekorácie',
    jewelry: 'Klenotníctvo',
    kiosk: 'Stánok',
    kitchen: 'Kuchynské štúdio',
    laundry: 'Práčovňa',
    lighting: 'Svietidlá',
    locksmith: 'Zámočník',
    lottery: 'Lotéria',
    mall: 'Nákupné stredisko',
    massage: 'Masážny salón',
    medical_supply: 'Zdravotnícke potreby',
    mobile_phone: 'Predaj mobilných telefónov',
    model: 'Predaj modelov',
    motorcycle: 'Predaj motocyklov',
    music: 'Predaj hudobných nosičov',
    musical_instrument: 'Hudobniny',
    newsagent: 'Noviny a časopisy',
    nutrition_supplements: 'Predaj potravinových doplnkov',
    optician: 'Optika',
    outdoor: 'Predaj outdoor vybavenia',
    outpost: 'Zásielkovňa',
    paint: 'Farby, laky',
    pastry: 'Obchod so sladkým pečivom',
    pawnbroker: 'Záložňa',
    perfumery: 'Parfuméria',
    pet: 'Potreby pre zvieratá',
    pet_grooming: 'Salón pre zvieracích miláčikov',
    photo: 'Fotografické služby',
    radiotechnics: 'Predaj elektronických súčiastok',
    rental: 'Požičovňa',
    seafood: 'Predaj morských plodov',
    second_hand: 'Second hand',
    sewing: 'Krajčírske potreby',
    shoes: 'Obuv',
    sports: 'Športové potreby',
    stationery: 'Papiernictvo',
    supermarket: 'Supermarket',
    tailor: 'Krajčír',
    tattoo: 'Tetovacie štúdio',
    tea: 'Čajovňa',
    ticket: 'Predaj lístkov',
    tobacco: 'Predaj tabakových výrobkov',
    toys: 'Hračkárstvo',
    trade: 'Stavebniny',
    travel_agency: 'Cestovná kancelária',
    tyres: 'Pneuservis',
    vacant: 'Prázdny obchod',
    variety_store: 'Rozličný tovar',
    video: 'Predaj DVD',
    video_games: 'Videohry',
    watches: 'Hodinárstvo',
    wholesale: 'Kusový predaj',
    window_blind: 'Predaj žalúzií',
    wine: 'Vinotéka',
  },
  sport: {
    '*': 'Šport {}',
    '9pin': 'Kužeľky',
    '10pin': 'Bowling',
    aikido: 'Aikido',
    airsoft: 'Airsoft',
    american_football: 'Americký futbal',
    archery: 'Lukostreľba',
    athletics: 'Atletika',
    badminton: 'Bedminton',
    baseball: 'Baseball',
    basketball: 'Basketbal',
    beachvolleyball: 'Plážový volejbal',
    bicycle: 'Cyklistika',
    bmx: 'BMX',
    boules: 'Guľový šport',
    bowling: 'Bowling',
    bowls: 'Bowls',
    canoe: 'Kanoe',
    chess: 'Šach',
    climbing: 'Lezenie',
    climbing_adventure: 'Climbing adventure',
    cycling: 'Cyklistika',
    darts: 'Šípky (šport)',
    disc_golf: 'Disc golf',
    dog_racing: 'Psie preteky',
    equestrian: 'Jazda na koni',
    field_hockey: 'Pozemný hokej',
    fitness: 'Posilňovňa',
    floorball: 'Floorball',
    free_flying: 'Závesné lietanie',
    golf: 'Golf',
    gymnastics: 'Gymnastika',
    handball: 'Hádzaná',
    hockey: 'Hokej',
    horse_racing: 'Dostihy',
    ice_hockey: 'Ľadový hokej',
    ice_skating: 'Korčuľovanie na ľade',
    judo: 'Džudo',
    karate: 'Karate',
    karting: 'Motokáry',
    laser_tag: 'Laser aréna',
    model_aerodrome: 'Modelárske letisko',
    motocross: 'Motokros',
    motor: 'Preteky motorových vozidiel',
    multi: 'Rôzne športy',
    netball: 'Nohejbal',
    paintball: 'Paintball',
    petanque: 'Petang',
    roller_skating: 'Kolieskové korčuľovanie',
    rowing: 'Veslovanie',
    running: 'Beh',
    scuba_diving: 'Potápanie',
    shooting: 'Streľba',
    shooting_range: 'Strelnica',
    'shot-put': 'Vrh guľou',
    skateboard: 'Skateboard',
    skating: 'Korčuľovanie',
    ski_jumping: 'Skoky na lyžiach',
    skiing: 'Lyžovanie',
    soccer: 'Futbal',
    squash: 'Squash',
    streetball: 'Streetball',
    swimming: 'Plávanie',
    table_tennis: 'Stolný tenis',
    tennis: 'Tenis',
    volleyball: 'Volejbal',
    water_ski: 'Vodné lyžovanie',
    workout: 'Cvičenie',
    yoga: 'Joga',
  },
  tourism: {
    '*': '{}',
    alpine_hut: 'Horská chata',
    apartment: 'Apartmán',
    artwork: {
      '*': 'Umenie',
      artwork_type: {
        architecture: 'Významná budova, stavba',
        bust: 'Busta',
        graffiti: 'Graffiti',
        installation: 'Umelecká inštalácia',
        mosaic: 'Mozaika (umenie)',
        mural: 'Nástenná maľba',
        painting: 'Maľba',
        relief: 'Reliéf (umenie)',
        sculpture: 'Plastika',
        statue: 'Socha',
        stone: 'Balvan (umenie)',
      },
    },
    attraction: 'Atrakcia',
    camp_site: 'Kemp',
    caravan_site: 'Autokemp pre obytné prívesy',
    chalet: 'Chata',
    guest_house: 'Penzión',
    hostel: 'Hostel',
    hotel: 'Hotel',
    information: {
      '*': 'Informácie',
      information: {
        '*': 'Informácie {}',
        board: 'Informačná tabuľa',
        guidepost: 'Rázcestník, smerovník',
        map: 'Mapa',
        office: 'Informačná kancelária',
      },
    },
    motel: 'Motel',
    museum: 'Múzeum',
    picnic_site: 'Miesto na piknik',
    viewpoint: 'Výhľad',
    wilderness_hut: 'Chata v divočine',
    zoo: 'ZOO',
  },
  type: {
    route: {
      '*': 'Trasa',
      route: {
        '*': 'Trasa {}',
        bicycle: 'Cyklotrasa',
        bus: 'Trasa autobusu',
        foot: 'Pešia trasa',
        hiking: 'Turistická trasa',
        horse: 'Jazdecká trasa',
        mtb: 'Trasa pre horské bicykle',
        piste: 'Bežkárska trasa',
        railway: 'Železničná trasa',
        ski: 'Lyžiarska trasa',
        tram: 'Električková trasa',
      },
    },
  },
  waterway: {
    '*': 'Vodný tok {}',
    canal: 'Kanál',
    dam: 'Priehrada',
    ditch: 'Priekopa',
    drain: 'Odtok',
    river: 'Rieka',
    stream: 'Potok',
    waterfall: 'Vodopád',
    weir: 'Hrádza',
  },
};

export const colorNames: Record<string, string> = {
  red: 'Červená',
  blue: 'Modrá',
  green: 'Zelená',
  yellow: 'Žltá',
  orange: 'Oranžová',
  purple: 'Purpurová',
  violet: 'Fialová',
  white: 'Biela',
  black: 'Čierna',
  gray: 'Sivá',
  brown: 'Hnedá',
};
