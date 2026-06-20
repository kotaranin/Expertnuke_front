export const questions = [
    {
        id: "P1",
        field: "reactorType",
        text: "Koji je tip nuklearnog reaktora?",
        type: "select",
        options: [
            { value: "RBMK", label: "RBMK (grafitom moderiran)" },
            { value: "VVER_PWR", label: "VVER/PWR (vodom moderiran i hlađen)" },
            { value: "BWR", label: "BWR (kipuća voda, zapadni dizajn)" },
        ],
        next: () => "P2"
    },
    {
        id: "P2",
        field: "power",
        text: "Koliki je trenutni nivo toplotne snage reaktora izražen u procentima od nominalne snage?",
        type: "number",
        min: 0,
        max: 120,
        next: (value) => (value < 20) ? "P2a" : "P3"
    },
    {
        id: "P2a",
        field: "minutesOnLowPower",
        text: "Koliko minuta reaktor radi na snazi ispod 20% nominalne?",
        type: "number",
        min: 0,
        next: (value) => (value >= 240) ? "P2b" : "P3"
    },
    {
        id: "P2b",
        field: "requestedPowerIncrease",
        text: "Da li postoji nalog da se snaga podigne u narednih 2 sata?",
        type: "select",
        options: [
            { value: true, label: "Da - planira se podizanje snage." },
            { value: false, label: "Ne - reaktor ostaje na niskoj snazi ili ide na gašenje." },
        ],
        next: (value) => "P3"
    },
    {
        id: "P3",
        field: "rodsPulled",
        text: "Koliko kontrolnih šipki je trenutno izvučeno iz jezgra (u % od ukupnog broja)?",
        type: "number",
        min: 0,
        max: 100,
        next: (value) => (value <= 70) ? "P4" : "P3a"
    },
    {
        id: "P3a",
        field: "rodStatus",
        text: "Da li se beleži sporiji ulazak kontrolnih šipki u jezgro?",
        type: "select",
        options: [
            { value: "NORMAL", label: "Ne, šipke ulaze normalnom brzinom." },
            { value: "SLOW", label: "Da, primetno usporenje jedne ili više šipki." },
            { value: "STUCK", label: "Jedna ili više šipki zaglavljene, ne ulaze u jezgro." },
        ],
        next: (value) => "P4"
    },
    {
        id: "P4",
        field: "pressure",
        text: "Koliki je pritisak u primarnom rashladnom kolu (u barima)?",
        type: "number",
        min: 0,
        next: (value, allAnswers) => {
            const limits = {
                RBMK: 80,
                VVER_PWR: 165,
                BWR: 85,
            };
            const upperLimit = limits[allAnswers.reactorType];
            if (value > upperLimit * 1.05) return "P4a";
            if (value < upperLimit * 0.9) return "P4b";
            return "P5";
        }
    },
    {
        id: "P4a",
        field: "porvStatus",
        text: "Da li je ventil za smanjenje pritiska otvoren ili se zaglavio u otvorenom položaju?",
        type: "select",
        options: [
            { value: "NORMAL", label: "Ventil radi normalno - pritisak se kontrolisano smanjuje." },
            { value: "STUCK_OPEN", label: "Ventil zaglavio u otvorenom položaju." },
            { value: "NON_RESPONSIVE", label: "Ventil ne reaguje - ostaje zatvoren uprkos komandi." },
        ],
        next: (value) => "P5"
    },
    {
        id: "P4b",
        field: "pressureDrop",
        text: "Kolika je stopa pada pritiska (bari u minuti)?",
        type: "number",
        min: 0,
        next: (value, allAnswers) => (allAnswers.waterLevel === "DECREASED") ? "P7" : "P5"
    },
    {
        id: "P5",
        field: "temperature",
        text: "Kolika je temperatura rashladne vode na izlazu iz jezgra reaktora (u °C)?",
        type: "number",
        min: 0,
        next: (value, allAnswers) => {
            const limits = {
                RBMK: 284,
                VVER_PWR: 320,
                BWR: 286,
            };
            const upperLimit = limits[allAnswers.reactorType];
            if (value > upperLimit + 5 && value < upperLimit + 15) return "P5a";
            return "P6";
        }
    },
    {
        id: "P5a",
        field: "pumpStatus",
        text: "Da li su sve pumpe primarnog rashladnog kola operativne?",
        type: "select",
        options: [
            { value: "ALL_FUNCTIONAL", label: "Da - sve pumpe rade nominalno." },
            { value: "ONE_MALFUNCTIONED", label: "Jedna pumpa je otkazala ili radi ispod kapaciteta." },
            { value: "MULTIPLE_MALFUNCTIONED", label: "Dve ili više pumpi su otkazale." },
            { value: "ALL_MALFUNCTIONED", label: "Sve pumpe su izgubile napajanje." },
        ],
        next: (value) => (value == "ALL_MALFUNCTIONED") ? "P8a" : "P6"
    },
    {
        id: "P6",
        field: "waterLevel",
        text: "Koliki je nivo rashladne vode u reaktorskom sudu?",
        type: "select",
        options: [
            { value: "NORMAL", label: "Normalan nivo." },
            { value: "DECREASED", label: "Snižen - između 10% i 25% ispod normale." },
            { value: "CRITICALLY_DECREASED", label: "Kritično snižen - više od 25% ispod normale ili nivo i dalje pada." },
        ],
        next: (value) => (value == "DECREASED") ? "P4b" : "P7"
    },
    {
        id: "P7",
        field: "testInProgress",
        text: "Da li je reaktor trenutno u toku planiranog testa, eksperimenta ili nestandardne procedure?",
        type: "select",
        options: [
            { value: true, label: "Da." },
            { value: false, label: "Ne." },
        ],
        next: (value) => (value) ? "P7a" : "P8"
    },
    {
        id: "P7a",
        type: "multiselect",
        text: "Koji sigurnosni sistem je isključen ili privremeno deaktiviran radi testa?",
        options: [
            { field: "eccsOff", label: "ECCS (Emergency Core Cooling System)" },
            { field: "scramOff", label: "Automatski SCRAM signal" },
            { field: "fluxMonitoringOff", label: "Sistem za praćenje neutronskog fluksa" },
            { field: "pumpsOff", label: "Pumpe rashladnog kola" },
        ],
        next: () => "P8",
    },
    {
        id: "P8",
        field: "externalPower",
        text: "Da li je spoljašnje električno napajanje postrojenja trenutno dostupno?",
        type: "select",
        options: [
            { value: "AVAILABLE", label: "Da - napajanje sa mreže stabilno." },
            { value: "PARTIALLY_LOST", label: "Delimično izgubljeno - jedan od dva nezavisna voda." },
            { value: "FULLY_LOST", label: "Potpuno izgubljeno - oba napajanja izgubljena." },
        ],
        next: (value) => (value == "AVAILABLE") ? "P9" : "P8a"
    },
    {
        id: "P8a",
        field: "secondsUntilDiesel",
        text: "Za koliko sekundi su dizel-generatori preuzeli napajanje (ako nisu startovani, uneti 9999)?",
        type: "number",
        min: 0,
        next: (value) => "P9"
    },
    {
        id: "P9",
        field: "hydrogenConcentration",
        text: "Kolika je koncentracija vodonika unutar zaštitne zgrade (u % zapremine)?",
        type: "number",
        min: 0,
        next: (value) => "P10"
    },
    {
        id: "P10",
        field: "radiation",
        text: "Koliki je nivo gama radijacije u kontrolnoj sali (u mSv/h)?",
        type: "number",
        min: 0,
        next: (value) => (value >= 0.5 && value < 100) ? "P10a" : null
    },
    {
        id: "P10a",
        field: "gasLeaks",
        text: "Da li detektori radioaktivnih gasova beleže porast u ventilacionim kanalima reaktorske zgrade?",
        type: "select",
        options: [
            { value: true, label: "Da - detektovano curenje radioaktivnih gasova." },
            { value: false, label: "Ne - gasovi u normalnom opsegu." },
        ],
        next: (value) => (value) ? "P10b" : null
    },
    {
        id: "P10b",
        field: "increasedIodineActivity",
        text: "Da li je aktivitet joda-131 u rashladnoj vodi povišen za više od 100 puta u odnosu na nominalnu vrednost?",
        type: "select",
        options: [
            { value: "YES", label: "Da - potvrđeno oštećenje gorivnih elemenata." },
            { value: "POSSIBLY", label: "Moguće - blago povišen aktivitet bez potvrde." },
            { value: "NO", label: "Ne - aktivitet u normalnom opsegu." },
        ],
        next: (value) => null
    }
]