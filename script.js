// Debug: Verificar que el script se cargue
console.log('Script.js cargado correctamente');

// Variables globales
let preguntaActual = 0;
let respuestas = {};
const totalPreguntas = 10;

// Elementos de evaluación interactiva - TEMA LIDERAZGO
const elementosInteractivos = [
    {
        tipo: "escenario",
        titulo: "Toma de decisiones en equipo 🎯",
        escenario: "Tu equipo no puede ponerse de acuerdo sobre un proyecto importante con fecha límite cercana. ¿Qué haces?",
        opciones: [
            "Tomo la decisión final basándome en mi experiencia y análisis",
            "Facilito una discusión estructurada para llegar a un consenso",
            "Pido más tiempo para investigar todas las opciones disponibles",
            "Divido el equipo en grupos para que exploren diferentes enfoques"
        ],
        categoria: "Estilo de toma de decisiones"
    },
    {
        tipo: "pregunta",
        titulo: "Manejo de conflictos 💥",
        pregunta: "Cuando surge un conflicto entre miembros de tu equipo, tu enfoque es:",
        opciones: [
            "Intervenir inmediatamente y mediar directamente",
            "Dar espacio para que resuelvan el conflicto por sí mismos",
            "Organizar una reunión formal para abordar el problema",
            "Reasignar tareas para minimizar la fricción"
        ],
        categoria: "Resolución de conflictos"
    },
    {
        tipo: "escenario",
        titulo: "Motivación del equipo ✨",
        escenario: "Tu equipo está desmotivado después de un revés importante. ¿Cómo respondes?",
        opciones: [
            "Comparto una visión inspiradora del futuro y nuestros objetivos",
            "Reconozco el esfuerzo y organizo una actividad para levantar el ánimo",
            "Analizo lo que salió mal y creo un plan de acción mejorado",
            "Me reúno individualmente con cada miembro para entender sus preocupaciones"
        ],
        categoria: "Habilidades de motivación"
    },
    {
        tipo: "pregunta",
        titulo: "Comunicación efectiva 🗣️",
        pregunta: "¿Cómo prefieres comunicar información importante a tu equipo?",
        opciones: [
            "Reuniones cara a cara donde puedo leer el lenguaje corporal",
            "Correos electrónicos detallados con documentación completa",
            "Presentaciones visuales con datos y gráficos claros",
            "Comunicación individual adaptada a cada persona"
        ],
        categoria: "Estilo de comunicación"
    },
    {
        tipo: "escenario",
        titulo: "Delegación de responsabilidades 📋",
        escenario: "Tienes un proyecto complejo que requiere múltiples habilidades. ¿Cómo delegas?",
        opciones: [
            "Asigno tareas específicas con instrucciones detalladas",
            "Presento el objetivo general y dejo que el equipo decida cómo organizarse",
            "Emparejo a personas con diferentes fortalezas para que colaboren",
            "Permito que los miembros elijan las tareas que más les interesan"
        ],
        categoria: "Capacidad de delegación"
    },
    {
        tipo: "pregunta",
        titulo: "Adaptabilidad al cambio 🔄",
        pregunta: "Cuando las circunstancias cambian repentinamente, tu primera reacción es:",
        opciones: [
            "Evaluar rápidamente la nueva situación y ajustar la estrategia",
            "Consultar con el equipo antes de tomar cualquier decisión",
            "Mantener la calma y asegurarme de que todos entiendan los cambios",
            "Proteger al equipo del estrés manejando los cambios yo mismo"
        ],
        categoria: "Flexibilidad estratégica"
    },
    {
        tipo: "escenario",
        titulo: "Desarrollo del talento 🌱",
        escenario: "Un miembro del equipo muestra potencial pero comete errores frecuentes. ¿Tu enfoque?",
        opciones: [
            "Proporcionar mentoría constante y oportunidades de crecimiento",
            "Dar autonomía para que aprenda de sus propios errores",
            "Asignar tareas más simples hasta que gane más experiencia",
            "Emparejarlo con un colega más experimentado"
        ],
        categoria: "Desarrollo de equipo"
    },
    {
        tipo: "pregunta",
        titulo: "Manejo del estrés 🏃‍♀️",
        pregunta: "En situaciones de alta presión, tu estilo de liderazgo tiende a ser:",
        opciones: [
            "Focalizado y decisivo, priorizando la acción rápida",
            "Calmado y centrado, manteniendo la estabilidad del equipo",
            "Colaborativo, distribuyendo la presión entre todos",
            "Analítico, buscando la solución óptima sin dejarme llevar por el pánico"
        ],
        categoria: "Liderazgo bajo presión"
    },
    {
        tipo: "escenario",
        titulo: "Innovación y creatividad 💡",
        escenario: "Necesitas fomentar ideas innovadoras en tu equipo. ¿Qué estrategia usas?",
        opciones: [
            "Organizar sesiones de lluvia de ideas sin críticas",
            "Proponer desafíos con recompensas por ideas creativas",
            "Crear un ambiente donde el fracaso sea visto como aprendizaje",
            "Traer ejemplos externos para inspirar nuevas perspectivas"
        ],
        categoria: "Fomento de la innovación"
    },
    {
        tipo: "pregunta",
        titulo: "Feedback y reconocimiento 🌟",
        pregunta: "¿Cómo manejas el reconocimiento del buen trabajo en tu equipo?",
        opciones: [
            "Reconocimiento público inmediato para reforzar comportamientos positivos",
            "Feedback personalizado y privado basado en objetivos específicos",
            "Sistema estructurado de recompensas y reconocimientos",
            "Celebraciones grupales de los éxitos del equipo"
        ],
        categoria: "Gestión del desempeño"
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado');
    
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Configurar event listeners
    const empezarBtn = document.getElementById('empezar-btn');
    const continuarBtn = document.getElementById('continuar-btn');
    
    if (empezarBtn) {
        console.log('Botón empezar encontrado');
        empezarBtn.addEventListener('click', mostrarInstrucciones);
    } else {
        console.error('Botón empezar NO encontrado');
    }
    
    if (continuarBtn) {
        console.log('Botón continuar encontrado');
        continuarBtn.addEventListener('click', iniciarEvaluacion);
    } else {
        console.error('Botón continuar NO encontrado');
    }
    
    document.getElementById('siguiente-btn').addEventListener('click', siguientePregunta);
    document.getElementById('anterior-btn').addEventListener('click', anteriorPregunta);
    document.getElementById('reiniciar-btn').addEventListener('click', reiniciarEvaluacion);
});

// Funciones de navegación
function mostrarInstrucciones() {
    document.getElementById('presentacion').classList.remove('active');
    document.getElementById('instrucciones').classList.add('active');
}

function iniciarEvaluacion() {
    document.getElementById('instrucciones').classList.remove('active');
    document.getElementById('evaluacion').classList.add('active');
    mostrarPregunta(0);
}

function mostrarPregunta(numero) {
    preguntaActual = numero;
    const elemento = elementosInteractivos[numero];
    const tituloPregunta = document.getElementById('pregunta-titulo');
    const contenidoInteractivo = document.getElementById('contenido-interactivo');
    
    // Actualizar barra de progreso y texto
    const progresoPorcentaje = ((numero + 1) / totalPreguntas) * 100;
    document.getElementById('progreso').style.width = `${progresoPorcentaje}%`;
    document.getElementById('progreso-texto').textContent = `${Math.round(progresoPorcentaje)}%`;
    
    // Mostrar título
    tituloPregunta.textContent = `${numero + 1}. ${elemento.titulo}`;
    
    // Construir contenido según el tipo
    contenidoInteractivo.innerHTML = '';
    
    if (elemento.tipo === 'pregunta') {
        contenidoInteractivo.innerHTML = `
            <div class="pregunta">
                <p>${elemento.pregunta}</p>
                <div class="opciones">
                    ${elemento.opciones.map((opcion, index) => `
                        <div class="opcion ${respuestas[numero] === index ? 'seleccionada' : ''}" data-indice="${index}">
                            ${opcion}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (elemento.tipo === 'escenario') {
        contenidoInteractivo.innerHTML = `
            <div class="escenario">
                <p>${elemento.escenario}</p>
            </div>
            <div class="opciones">
                ${elemento.opciones.map((opcion, index) => `
                    <div class="opcion ${respuestas[numero] === index ? 'seleccionada' : ''}" data-indice="${index}">
                        ${opcion}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Añadir event listeners a las opciones
    const opciones = contenidoInteractivo.querySelectorAll('.opcion');
    opciones.forEach(opcion => {
        opcion.addEventListener('click', function() {
            // Deseleccionar todas las opciones
            opciones.forEach(o => o.classList.remove('seleccionada'));
            // Seleccionar la opción clickeada
            this.classList.add('seleccionada');
            // Guardar respuesta
            respuestas[numero] = parseInt(this.getAttribute('data-indice'));
        });
    });
    
    // Actualizar estado de botones de navegación
    document.getElementById('anterior-btn').style.display = numero === 0 ? 'none' : 'block';
    document.getElementById('siguiente-btn').textContent = numero === totalPreguntas - 1 ? 'Ver Resultados 🎉' : 'Siguiente ➡️';
}

function siguientePregunta() {
    if (preguntaActual < totalPreguntas - 1) {
        mostrarPregunta(preguntaActual + 1);
    } else {
        mostrarResultados();
    }
}

function anteriorPregunta() {
    if (preguntaActual > 0) {
        mostrarPregunta(preguntaActual - 1);
    }
}

function mostrarResultados() {
    document.getElementById('evaluacion').classList.remove('active');
    document.getElementById('resultados').classList.add('active');
    
    // Calcular resultados
    const resultados = calcularResultadosLiderazgo();
    
    // Actualizar el círculo de porcentaje
    const porcentajeElement = document.getElementById('porcentaje-liderazgo');
    const scoreCircle = document.querySelector('.score-circle');
    
    // Animación del porcentaje
    let porcentaje = 0;
    const incremento = resultados.porcentajeTotal / 100;
    const timer = setInterval(() => {
        porcentaje += incremento;
        if (porcentaje >= resultados.porcentajeTotal) {
            porcentaje = resultados.porcentajeTotal;
            clearInterval(timer);
        }
        porcentajeElement.textContent = `${Math.round(porcentaje)}%`;
        scoreCircle.style.background = `conic-gradient(#ff6b6b ${porcentaje}%, #e9ecef ${porcentaje}%)`;
    }, 20);
    
    // Mostrar resultados detallados
    const resultadosContenido = document.getElementById('resultados-contenido');
    resultadosContenido.innerHTML = `
        <div class="resultado-categoria">
            <h3>🎯 Tu Estilo de Liderazgo Principal</h3>
            <p>${resultados.estiloPrincipal}</p>
        </div>
        ${resultados.fortalezas.map(fortaleza => `
            <div class="resultado-categoria">
                <h3>💪 ${fortaleza.nombre}</h3>
                <p>${fortaleza.descripcion}</p>
            </div>
        `).join('')}
        ${resultados.areasDesarrollo.map(area => `
            <div class="resultado-categoria">
                <h3>🌱 ${area.nombre}</h3>
                <p>${area.descripcion}</p>
            </div>
        `).join('')}
        <div class="resultado-categoria">
            <h3>🚀 Recomendaciones para Desarrollar tu Liderazgo</h3>
            <p>${resultados.recomendaciones}</p>
        </div>
    `;
}

function calcularResultadosLiderazgo() {
    // Calcular puntuaciones por categoría
    const categorias = {};
    
    elementosInteractivos.forEach((elemento, index) => {
        const categoria = elemento.categoria;
        if (!categorias[categoria]) {
            categorias[categoria] = [];
        }
        if (respuestas[index] !== undefined) {
            categorias[categoria].push(respuestas[index]);
        }
    });
    
    // Calcular porcentaje total (simplificado)
    const totalRespuestas = Object.keys(respuestas).length;
    const puntuacionMaxima = totalRespuestas * 3; // Asumiendo que 3 es la mejor puntuación
    let puntuacionTotal = 0;
    
    Object.values(respuestas).forEach(respuesta => {
        // Invertir la puntuación para que respuestas más altas sean mejores
        puntuacionTotal += (3 - respuesta);
    });
    
    const porcentajeTotal = Math.round((puntuacionTotal / puntuacionMaxima) * 100);
    
    // Determinar estilo de liderazgo
    let estiloPrincipal = "";
    if (porcentajeTotal >= 80) {
        estiloPrincipal = "Eres un Líder Transformacional 🦸‍♀️ - Inspiras a tu equipo con una visión clara y fomentas la innovación y el crecimiento personal.";
    } else if (porcentajeTotal >= 60) {
        estiloPrincipal = "Tienes un Estilo de Liderazgo Democrático 🤝 - Valoras la participación del equipo y buscas consenso en las decisiones importantes.";
    } else if (porcentajeTotal >= 40) {
        estiloPrincipal = "Tu estilo es de Liderazgo Coaching 🧠 - Te enfocas en desarrollar el potencial de cada miembro del equipo mediante mentoría y apoyo.";
    } else {
        estiloPrincipal = "Tienes características de Liderazgo Situacional 🔄 - Adaptas tu estilo según las necesidades específicas del equipo y la situación.";
    }
    
    // Fortalezas identificadas
    const fortalezas = [
        {
            nombre: "Comunicación Efectiva",
            descripcion: "Tienes habilidad para transmitir ideas claramente y escuchar activamente a los miembros de tu equipo."
        },
        {
            nombre: "Toma de Decisiones",
            descripcion: "Eres capaz de analizar situaciones complejas y tomar decisiones informadas bajo presión."
        }
    ];
    
    // Áreas de desarrollo
    const areasDesarrollo = [
        {
            nombre: "Delegación Estratégica",
            descripcion: "Podrías mejorar distribuyendo responsabilidades de manera más efectiva para empoderar a tu equipo."
        },
        {
            nombre: "Manejo de Conflictos",
            descripcion: "Desarrollar estrategias más proactivas para resolver desacuerdos fortalecería la dinámica del equipo."
        }
    ];
    
    // Recomendaciones personalizadas
    let recomendaciones = "";
    if (porcentajeTotal >= 70) {
        recomendaciones = "Continúa desarrollando tu intuición para el talento y considera mentoría para otros líderes emergentes. Tu siguiente paso podría ser liderar iniciativas de mayor escala.";
    } else if (porcentajeTotal >= 50) {
        recomendaciones = "Enfócate en construir relaciones más sólidas con tu equipo y practica la delegación estratégica. Participa en talleres de liderazgo situacional.";
    } else {
        recomendaciones = "Comienza observando a líderes que admires y practica habilidades específicas en proyectos pequeños. La autoconciencia es tu mayor aliada en este momento.";
    }
    
    return {
        porcentajeTotal: porcentajeTotal,
        estiloPrincipal: estiloPrincipal,
        fortalezas: fortalezas,
        areasDesarrollo: areasDesarrollo,
        recomendaciones: recomendaciones
    };
}

function reiniciarEvaluacion() {
    preguntaActual = 0;
    respuestas = {};
    document.getElementById('resultados').classList.remove('active');
    document.getElementById('presentacion').classList.add('active');
    
    // Reiniciar animaciones
    AOS.refresh();
}
