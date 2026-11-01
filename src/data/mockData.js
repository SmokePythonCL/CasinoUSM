// Datos de prueba realistas para Casino USM basados en el informe y DESIGN.md

export const INITIAL_USER = {
  name: "Juan Carmona",
  role: "Docente Jornada Completa",
  department: "Departamento de Informática",
  rut: "15.420.819-3",
  campusDefault: "Campus San Joaquín",
  email: "juan.carmona@usm.cl",
  balanceColaciones: 18
};

export const CAMPUSES = [
  "Campus San Joaquín",
  "Campus Casa Central (Valparaíso)",
  "Campus Vitacura",
  "Sede Viña del Mar",
  "Sede Concepción"
];

export const DIET_TYPES = {
  TODOS: "todos",
  TRADICIONAL: "tradicional",
  VEGETARIANO: "vegetariano",
  HIPOCALORICO: "hipocalorico"
};

export const MENU_WEEKS = {
  "semana-1": {
    label: "Semana 1 (02 al 06 Nov)",
    startDate: "2026-11-02",
    endDate: "2026-11-06"
  },
  "semana-2": {
    label: "Semana 2 (9 al 13 Nov)",
    startDate: "2026-11-09",
    endDate: "2026-11-13"
  },
  "semana-3": {
    label: "Semana 3 (16 al 20 Nov)",
    startDate: "2026-11-16",
    endDate: "2026-11-20"
  },
  "semana-4": {
    label: "Semana 4 (23 al 27 Nov)",
    startDate: "2026-11-23",
    endDate: "2026-11-27"
  }
};

export const WEEKLY_MENUS = {
  "semana-3": [
    {
      day: "Lunes",
      dateStr: "16 de Noviembre",
      dateKey: "2026-11-16",
      platos: {
        tradicional: {
          sopa: "Crema de Zapallo y Jengibre",
          fondo: "Pastel de Choclo tradicional con pino de vacuno",
          ensalada: "Mix verde con tomate cherry y semillas",
          postre: "Flan de caramelo artesanal",
          calorias: "680 kcal",
          alergenos: ["Lactosa", "Huevos"]
        },
        vegetariano: {
          sopa: "Crema de Zapallo y Jengibre",
          fondo: "Pastel de Choclo vegetariano con pino de champiñones y soya",
          ensalada: "Mix verde con palmitos y sésamo",
          postre: "Flan de vainilla o fruta fresca de estación",
          calorias: "520 kcal",
          alergenos: ["Soya", "Lactosa"]
        },
        hipocalorico: {
          sopa: "Consomé desgrasado de verduras de la huerta",
          fondo: "Pechuga de pollo a la plancha con quinoa tricolor al vapor",
          ensalada: "Ensalada surtida (pepino, apio, espinaca y limón)",
          postre: "Compota de manzana sin azúcar añadida",
          calorias: "410 kcal",
          alergenos: []
        }
      }
    },
    {
      day: "Martes",
      dateStr: "17 de Noviembre",
      dateKey: "2026-11-17",
      platos: {
        tradicional: {
          sopa: "Sopa minestrone campesina con fideos",
          fondo: "Carne mechada al jugo con puré rústico de papas",
          ensalada: "Chilena suave y lechuga hidropónica",
          postre: "Torta tres leches USM",
          calorias: "720 kcal",
          alergenos: ["Gluten", "Lactosa"]
        },
        vegetariano: {
          sopa: "Sopa minestrone campesina sin carne",
          fondo: "Goulash de seitán y champiñones con puré rústico",
          ensalada: "Chilena suave y lechuga hidropónica",
          postre: "Macedonia de frutas naturales",
          calorias: "540 kcal",
          alergenos: ["Gluten", "Lactosa"]
        },
        hipocalorico: {
          sopa: "Crema ligera de espárragos desgrasada",
          fondo: "Filete de reineta al horno con verduras asadas al romero",
          ensalada: "Rúcula, betarraga rallada y zanahoria",
          postre: "Jalea light de frambuesa con trozos de fruta",
          calorias: "390 kcal",
          alergenos: ["Pescado"]
        }
      }
    },
    {
      day: "Miércoles",
      dateStr: "18 de Noviembre",
      dateKey: "2026-11-18",
      platos: {
        tradicional: {
          sopa: "Crema de verduras del huerto",
          fondo: "Lasaña boloñesa gratinada al horno",
          ensalada: "Lechuga escarola con choclo y palta",
          postre: "Pie de limón USM",
          calorias: "750 kcal",
          alergenos: ["Gluten", "Lactosa", "Huevos"]
        },
        vegetariano: {
          sopa: "Crema de verduras del huerto",
          fondo: "Lasaña de berenjenas, espinaca y salsa bechamel de avena",
          ensalada: "Ensalada verde con palta y nueces tostadas",
          postre: "Peras al vino tinto o fruta fresca",
          calorias: "510 kcal",
          alergenos: ["Gluten", "Frutos secos"]
        },
        hipocalorico: {
          sopa: "Caldo claro de apio y zanahoria",
          fondo: "Hamburguesa magra de pavo con arroz integral al cilantro",
          ensalada: "Repollo morado, manzana verde y ciboulette",
          postre: "Yogurt natural desnatado con frutos del bosque",
          calorias: "420 kcal",
          alergenos: ["Lactosa"]
        }
      }
    },
    {
      day: "Jueves",
      dateStr: "19 de Noviembre",
      dateKey: "2026-11-19",
      platos: {
        tradicional: {
          sopa: "Crema de arvejas con crutones",
          fondo: "Cazuela de vacuno criolla con choclo, zapallo y porotos verdes",
          ensalada: "Tomate con albahaca fresca y quesillo",
          postre: "Leche asada casera",
          calorias: "690 kcal",
          alergenos: ["Gluten", "Lactosa", "Huevos"]
        },
        vegetariano: {
          sopa: "Crema de arvejas con semillas de zapallo tostadas",
          fondo: "Guiso de lentejas rojas al curry suave con arroz basmati y verduras salteadas",
          ensalada: "Ensalada de espinacas baby con tomates secos y sésamo",
          postre: "Compota tibia de peras y canela",
          calorias: "490 kcal",
          alergenos: []
        },
        hipocalorico: {
          sopa: "Caldo de alcachofas diurético",
          fondo: "Escalopa de pollo horneada (sin apanar) con mix de verduras salteadas al wok",
          ensalada: "Pepino, brotes de alfalfa y tomate cherry",
          postre: "Naranja en rodajas con menta",
          calorias: "380 kcal",
          alergenos: []
        }
      }
    },
    {
      day: "Viernes",
      dateStr: "20 de Noviembre",
      dateKey: "2026-11-20",
      platos: {
        tradicional: {
          sopa: "Consomé de ave con huevo batido",
          fondo: "Salmón a la plancha con risotto de champiñones",
          ensalada: "Mix mediterráneo con aceitunas y pimientos",
          postre: "Mousse de chocolate semi amargo",
          calorias: "710 kcal",
          alergenos: ["Pescado", "Lactosa"]
        },
        vegetariano: {
          sopa: "Caldo aromático de verduras y hierbas finas",
          fondo: "Risotto integral de champiñones silvestres y espárragos",
          ensalada: "Mix mediterráneo con aceitunas y almendras laminadas",
          postre: "Mousse vegano de cacao con leche de coco",
          calorias: "530 kcal",
          alergenos: ["Frutos secos"]
        },
        hipocalorico: {
          sopa: "Crema suave de zapallitos italianos",
          fondo: "Tilapia al vapor con limón y ensalada tibia de porotos verdes con zanahoria baby",
          ensalada: "Hojas verdes frescas con vinagreta de manzana",
          postre: "Piña natural fresca en rodajas",
          calorias: "360 kcal",
          alergenos: ["Pescado"]
        }
      }
    }
  ]
};

// Generar menus para las otras semanas de Noviembre con pequeñas variaciones
["semana-1", "semana-2", "semana-4"].forEach(semKey => {
  WEEKLY_MENUS[semKey] = WEEKLY_MENUS["semana-3"].map((item, idx) => {
    let dayNum = semKey === "semana-1" ? (2 + idx) : (semKey === "semana-2" ? (9 + idx) : (23 + idx));
    const dayPadded = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    return {
      ...item,
      dateStr: `${dayNum} de Noviembre`,
      dateKey: `2026-11-${dayPadded}`
    };
  });
});

export const INITIAL_RESERVATIONS = [
  {
    id: "RES-2026-8941",
    date: "2026-11-04",
    dateFormatted: "Martes 03 Nov, 2026",
    menuType: "tradicional",
    menuName: "Carne mechada con puré rústico",
    campus: "Campus San Joaquín",
    status: "Confirmada",
    notes: "Sin sal añadida por recomendación médica",
    canEdit: true
  },
  {
    id: "RES-2026-9012",
    date: "2026-11-06",
    dateFormatted: "Jueves 05 Nov, 2026",
    menuType: "vegetariano",
    menuName: "Guiso de lentejas rojas al curry suave",
    campus: "Campus San Joaquín",
    status: "Confirmada",
    notes: "",
    canEdit: true
  },
  {
    id: "RES-2026-9150",
    date: "2026-11-12",
    dateFormatted: "Miércoles 11 Nov, 2026",
    menuType: "hipocalorico",
    menuName: "Hamburguesa magra de pavo con arroz integral",
    campus: "Campus San Joaquín",
    status: "Confirmada",
    notes: "Alergia a mariscos (mantener libre de contaminación cruzada)",
    canEdit: true
  }
];

export const INITIAL_CONSUMPTIONS = [
  {
    id: "CON-7821",
    date: "28 de Octubre, 2026",
    time: "13:25 hrs",
    menuName: "Pollo al horno con papas doradas",
    menuType: "tradicional",
    campus: "Campus San Joaquín - Casino Central",
    status: "Consumido",
    validator: "Tótem Autoservicio 02"
  },
  {
    id: "CON-7754",
    date: "23 de Octubre, 2026",
    time: "13:40 hrs",
    menuName: "Lasaña de verduras y berenjena",
    menuType: "vegetariano",
    campus: "Campus San Joaquín - Casino Central",
    status: "Consumido",
    validator: "Mesón 01 - Sra. Gladys"
  },
  {
    id: "CON-7690",
    date: "21 de Octubre, 2026",
    time: "13:10 hrs",
    menuName: "Pescado reineta con ensaladas surtidas",
    menuType: "hipocalorico",
    campus: "Campus San Joaquín - Casino Central",
    status: "Consumido",
    validator: "Tótem Autoservicio 01"
  },
  {
    id: "CON-7540",
    date: "14 de Octubre, 2026",
    time: "14:02 hrs",
    menuName: "Cazuela tradicional de vacuno",
    menuType: "tradicional",
    campus: "Campus San Joaquín - Casino Central",
    status: "Consumido",
    validator: "Mesón 02 - Don Carlos"
  }
];
