import { Question } from "@/types/quiz";

export const questions: Question[] = [
  // Introducció a la programació
  {
    id: 1,
    question: "Quants tipus d'operacions bàsiques pot realitzar un ordinador?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    category: "Introducció",
    explanation: "Un ordinador pot realitzar 3 tipus d'operacions: aritmètiques bàsiques, lògiques (comparar valors) i emmagatzematge/recuperació d'informació.",
    rarity: 'common'
  },
  {
    id: 2,
    question: "Què és un algorisme?",
    options: [
      "Un programa d'ordinador",
      "Un llenguatge de programació", 
      "La descripció exacta de la seqüència de passos per resoldre un problema",
      "Un tipus de variable"
    ],
    correctAnswer: 2,
    category: "Introducció",
    explanation: "Un algorisme és la descripció exacta i sense ambigüitats de la seqüència de passos elementals per resoldre un problema determinat.",
    rarity: 'common'
  },

  // Llenguatges de programació
  {
    id: 3,
    question: "Quin és el llenguatge de baix nivell que utilitzen els ordinadors?",
    options: ["Assembly", "C", "Codi màquina", "Java"],
    correctAnswer: 2,
    category: "Llenguatges",
    explanation: "El codi màquina és el llenguatge de baix nivell format per uns i zeros (codi binari) que entén directament el microprocessador.",
    rarity: 'common'
  },
  {
    id: 4,
    question: "Quina característica té el llenguatge assemblador?",
    options: [
      "Utilitza només zeros i uns",
      "Cada instrucció equival a una instrucció en llenguatge màquina",
      "És independent del processador",
      "És un llenguatge d'alt nivell"
    ],
    correctAnswer: 1,
    category: "Llenguatges",
    explanation: "Cada instrucció en assemblador equival a una instrucció en llenguatge màquina, utilitzant paraules nemotècniques.",
    rarity: 'rare'
  },
  {
    id: 5,
    question: "Quin any va ser creat Python?",
    options: ["1989", "1991", "1993", "1995"],
    correctAnswer: 1,
    category: "Llenguatges",
    explanation: "Python va ser creat per Guido van Rossum l'any 1991, amb una filosofia de disseny que busca llegibilitat en el codi.",
    rarity: 'common'
  },
  {
    id: 6,
    question: "Quina característica destaca de Java?",
    options: [
      "Només serveix per a aplicacions web",
      "És multiplataforma",
      "Només funciona en Windows",
      "És un llenguatge interpretat"
    ],
    correctAnswer: 1,
    category: "Llenguatges",
    explanation: "Java és multiplataforma, el que significa que un programa compilat en Java pot ser executat en diferents sistemes operatius.",
    rarity: 'rare'
  },

  // Assembladors i intèrprets
  {
    id: 7,
    question: "Què és un compilador?",
    options: [
      "Un programa que executa codi directament",
      "Un programari que tradueix codi font a codi executable",
      "Un tipus de variable",
      "Un llenguatge de programació"
    ],
    correctAnswer: 1,
    category: "Compiladors",
    explanation: "Un compilador és un programari que tradueix el codi font escrit en un llenguatge d'alt nivell a codi executable per l'ordinador.",
    rarity: 'common'
  },
  {
    id: 8,
    question: "Quina diferència hi ha entre un compilador i un intèrpret?",
    options: [
      "No hi ha diferència",
      "El compilador genera codi objecte, l'intèrpret executa directament",
      "L'intèrpret és més ràpid",
      "El compilador només funciona amb Java"
    ],
    correctAnswer: 1,
    category: "Compiladors",
    explanation: "Un compilador genera un fitxer de codi objecte, mentre que l'intèrpret tradueix i executa directament sense generar cap fitxer intermig.",
    rarity: 'legendary'
  },

  // Fases de desenvolupament
  {
    id: 9,
    question: "Quantes fases hi ha en el desenvolupament d'un programa?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    category: "Desenvolupament",
    explanation: "Hi ha 4 fases principals: Anàlisi, Disseny, Implementació i Documentació.",
    rarity: 'common'
  },
  {
    id: 10,
    question: "Quin és l'objectiu principal de la fase d'anàlisi?",
    options: [
      "Escriure el codi",
      "Establir què ha de fer el programari",
      "Provar el programa",
      "Documentar el procés"
    ],
    correctAnswer: 1,
    category: "Desenvolupament",
    explanation: "L'anàlisi estableix què ha de fer el programari (no com ho ha de fer) i transforma les idees del client en especificacions.",
    rarity: 'rare'
  },
  {
    id: 11,
    question: "Durant quina fase es dissenyen els algorismes?",
    options: ["Anàlisi", "Disseny", "Implementació", "Documentació"],
    correctAnswer: 1,
    category: "Desenvolupament",
    explanation: "Durant la fase de disseny es crea el conjunt d'algorismes del programa utilitzant diagrames de flux i pseudocodi.",
    rarity: 'common'
  },

  // Variables i dades
  {
    id: 12,
    question: "Què és una variable?",
    options: [
      "Un tipus de dada",
      "Una zona de memòria amb un nom assignat",
      "Una instrucció de control",
      "Un operador matemàtic"
    ],
    correctAnswer: 1,
    category: "Variables",
    explanation: "Una variable és una zona de memòria a la que se li assigna un nom o identificador, on es desa una dada d'un determinat tipus.",
    rarity: 'common'
  },
  {
    id: 13,
    question: "Com es declara una variable de tipus enter en Java?",
    options: ["int num;", "integer num;", "number num;", "var num;"],
    correctAnswer: 0,
    category: "Variables",
    explanation: "En Java, una variable de tipus enter es declara amb 'int num;' on 'int' indica el tipus i 'num' és l'identificador.",
    rarity: 'rare'
  },

  // Diagrames de flux
  {
    id: 14,
    question: "Quin símbol s'utilitza per indicar una decisió en un diagrama de flux?",
    options: ["Rectangle", "Cercle", "Rombe", "Oval"],
    correctAnswer: 2,
    category: "Diagrames",
    explanation: "El símbol de decisió és un rombe que expressa una comprovació amb resultat cert/fals (SÍ/NO).",
    rarity: 'common'
  },
  {
    id: 15,
    question: "Quina norma bàsica s'ha de complir en els diagrames de flux?",
    options: [
      "Es poden encreuar les línies",
      "Les línies només poden ser diagonals",
      "No es poden encreuar les línies de flux",
      "Poden haver línies sense connectar"
    ],
    correctAnswer: 2,
    category: "Diagrames",
    explanation: "Una norma fonamental és que no es poden encreuar les línies de flux per mantenir la claredat del diagrama.",
    rarity: 'legendary'
  },
  {
    id: 16,
    question: "Quin símbol s'utilitza per a les operacions d'entrada i sortida?",
    options: ["Rectangle", "Paral·lelogram", "Rombe", "Cercle"],
    correctAnswer: 1,
    category: "Diagrames",
    explanation: "El paral·lelogram s'utilitza per especificar operacions d'entrada (llegir) o sortida (mostrar) de dades.",
    rarity: 'rare'
  },

  // Operadors i processos
  {
    id: 17,
    question: "Quin operador s'utilitza per a comparar igualtat en una condició?",
    options: ["=", "==", "!=", "=<"],
    correctAnswer: 1,
    category: "Operadors",
    explanation: "L'operador '==' s'utilitza per comparar igualtat, mentre que '=' es reserva per a operacions d'assignació.",
    rarity: 'common'
  },
  {
    id: 18,
    question: "Si volem restar un intent d'una variable 'intents', quina instrucció usaríem?",
    options: [
      "intents = -1",
      "intents = -intents", 
      "intents - 1",
      "intents = intents - 1"
    ],
    correctAnswer: 3,
    category: "Operadors",
    explanation: "Per restar un valor a una variable s'utilitza 'intents = intents - 1', assignant el valor actual menys 1.",
    rarity: 'rare'
  },

  // Casos pràctics
  {
    id: 19,
    question: "Què calcula l'operador '%' (mòdul)?",
    options: [
      "El percentatge",
      "La divisió",
      "El residu de la divisió",
      "La multiplicació"
    ],
    correctAnswer: 2,
    category: "Operadors",
    explanation: "L'operador '%' (mòdul) calcula el residu de la divisió entre dos nombres.",
    rarity: 'legendary'
  },
  {
    id: 20,
    question: "En un diagrama de flux, què indica el símbol oval?",
    options: [
      "Una decisió",
      "Un procés",
      "Inici o fi del programa",
      "Entrada de dades"
    ],
    correctAnswer: 2,
    category: "Diagrames",
    explanation: "El símbol oval s'utilitza per indicar l'inici i fi d'un programa o procediment.",
    rarity: 'common'
  }
];