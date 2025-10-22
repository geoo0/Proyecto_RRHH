// Variables globales
let preguntaActual = 0;
let respuestas = {};
const totalPreguntas = 10;

// Elementos de evaluación interactiva
const elementosInteractivos = [
    {
        tipo: "pregunta",
        titulo: "Preferencia social",
        pregunta: "En una fiesta, ¿cómo sueles comportarte?",
        opciones: [
            "Me relaciono con muchas personas y disfruto siendo el centro de atención",
            "Prefiero conversaciones profundas con pocas personas",
            "Observo desde un rincón y solo me uno cuando me siento cómodo",
            "Me cansa estar en eventos sociales y prefiero actividades solitarias"
        ],
        categoria: "Extraversión/Introversión"
    },
    {
        tipo: "pregunta",
        titulo: "Toma de decisiones",
        pregunta: "Al tomar una decisión importante, ¿qué priorizas?",
        opciones: [
            "La lógica y los hechos objetivos",
            "Los sentimientos y el impacto en las personas",
            "Un equilibrio entre razón y emoción",
            "La intuición y las corazonadas"
        ],
        categoria: "Pensamiento/Sentimiento"
    },
    {
        tipo: "escenario",
        titulo: "Resolución de problemas",
        escenario: "Te enfrentas a un problema complejo en el trabajo. ¿Cuál es tu enfoque?",
        opciones: [
            "Analizo todos los datos disponibles antes de actuar",
            "Sigo mi intuición y pruebo diferentes soluciones",
            "Consulto con colegas para obtener diferentes perspectivas",
            "Desgloso el problema en partes más pequeñas y manejables"
        ],
        categoria: "Percepción/Juicio"
    },
    {
        tipo: "pregunta",
        titulo: "Organización personal",
        pregunta: "¿Cómo describes tu espacio de trabajo o área de estudio?",
        opciones: [
            "Muy organizado, con todo en su lugar específico",
            "Organizado de forma flexible, sé dónde está todo",
            "Algo desordenado pero funcional para mí",
            "Caótico, pero encuentro lo que necesito cuando lo necesito"
        ],
        categoria: "Estructura/Flexibilidad"
    },
    {
        tipo: "escenario",
        titulo: "Manejo del estrés",
        escenario: "Cuando te sientes abrumado o estresado, ¿qué sueles hacer?",
        opciones: [
            "Busco actividades solitarias para recargar energías",
            "Hablo con amigos o familiares sobre lo que me preocupa",
            "Me sumerjo en el trabajo o proyectos para distraerme",
            "Practico ejercicio o meditación para relajarme"
        ],
        categoria: "Mecanismos de afrontamiento"
    },
    {
        tipo: "pregunta",
        titulo: "Estilo de comunicación",
        pregunta: "En una discusión, ¿cómo sueles expresar tus puntos de vista?",
        opciones: [
            "De forma directa y clara, sin rodeos",
            "Considerando cuidadosamente cómo mis palabras afectarán a los demás",
            "Con ejemplos y metáforas para ilustrar mi punto",
            "Escuchando primero y luego compartiendo mi perspectiva"
        ],
        categoria: "Comunicación"
    },
    {
        tipo: "escenario",
        titulo: "Trabajo en equipo",
        escenario: "En un proyecto grupal, ¿qué rol sueles adoptar?",
        opciones: [
            "El organizador que establece plazos y estructura",
            "El creativo que genera ideas innovadoras",
            "El mediador que resuelve conflictos",
            "El ejecutor que se enfoca en completar las tareas"
        ],
        categoria: "Roles grupales"
    },
    {
        tipo: "pregunta",
        titulo: "Enfoque temporal",
        pregunta: "¿En qué período temporal sueles enfocar tu atención?",
        opciones: [
            "En el presente, disfrutando el momento actual",
            "En el futuro, planificando y anticipando",
            "En el pasado, aprendiendo de experiencias anteriores",
            "En un equilibrio entre pasado, presente y futuro"
        ],
        categoria: "Orientación temporal"
    },
    {
        tipo: "escenario",
        titulo: "Tolerancia a la ambigüedad",
        escenario: "Te asignan una tarea con instrucciones poco claras. ¿Cómo reaccionas?",
        opciones: [
            "Me siento incómodo y busco aclaraciones inmediatamente",
            "Disfruto la libertad de interpretar la tarea a mi manera",
            "Investigo por mi cuenta para entender mejor lo que se espera",
            "Empiezo a trabajar y ajusto según sea necesario"
        ],
        categoria: "Tolerancia a la incertidumbre"
    },
    {
        tipo: "pregunta",
        titulo: "Motivación principal",
        pregunta: "¿Qué te impulsa principalmente en tu vida profesional/personal?",
        opciones: [
            "Lograr el éxito y el reconocimiento",
            "Ayudar a otros y contribuir al bien común",
            "Aprender y desarrollarme continuamente",
            "Encontrar equilibrio y satisfacción personal"
        ],
        categoria: "Motivación"
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Configurar event listeners
    document.getElementById('empezar-btn').addEventListener('click', mostrarInstrucciones);
    document.getElementById('continuar-btn').addEventListener('click', iniciarEvaluacion);
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
    
    // Actualizar barra de progreso
    const progreso = ((numero + 1) / totalPreguntas) * 100;
    document.getElementById('progreso').style.width = `${progreso}%`;
    
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
    document.getElementById('siguiente-btn').textContent = numero === totalPreguntas - 1 ? 'Ver resultados' : 'Siguiente';
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
    const resultados = calcularResultados();
    
    // Mostrar resultados
    const resultadosContenido = document.getElementById('resultados-contenido');
    resultadosContenido.innerHTML = `
        <div class="resultado-categoria">
            <h3>Perfil General</h3>
            <p>${resultados.perfilGeneral}</p>
        </div>
        ${resultados.categorias.map(categoria => `
            <div class="resultado-categoria">
                <h3>${categoria.nombre}</h3>
                <p>${categoria.descripcion}</p>
            </div>
        `).join('')}
        <div class="resultado-categoria">
            <h3>Recomendaciones</h3>
            <p>${resultados.recomendaciones}</p>
        </div>
    `;
}

function calcularResultados() {
    // Agrupar respuestas por categoría
    const categorias = {};
    
    elementosInteractivos.forEach((elemento, index) => {
        const categoria = elemento.categoria;
        if (!categorias[categoria]) {
            categorias[categoria] = [];
        }
        categorias[categoria].push(respuestas[index]);
    });
    
    // Generar descripciones basadas en las respuestas
    const resultadosCategorias = [];
    
    // Análisis de Extraversión/Introversión
    if (categorias["Extraversión/Introversión"]) {
        const respuestasCategoria = categorias["Extraversión/Introversión"];
        const promedio = respuestasCategoria.reduce((a, b) => a + b, 0) / respuestasCategoria.length;
        
        let descripcion;
        if (promedio < 1) {
            descripcion = "Tienes una tendencia marcada hacia la extraversión. Disfrutas de la interacción social y te energizas en entornos grupales. Tu estilo comunicativo es abierto y expresivo.";
        } else if (promedio < 2) {
            descripcion = "Eres una persona ambivertida, con un equilibrio entre características de extraversión e introversión. Te adaptas bien a diferentes situaciones sociales, aunque también valoras tu tiempo a solas.";
        } else {
            descripcion = "Presentas tendencias introvertidas. Prefieres entornos tranquilos y reflexivos, y te energizas en momentos de soledad. Tu estilo comunicativo es más reservado y selectivo.";
        }
        
        resultadosCategorias.push({
            nombre: "Extraversión/Introversión",
            descripcion: descripcion
        });
    }
    
    // Análisis de Pensamiento/Sentimiento
    if (categorias["Pensamiento/Sentimiento"]) {
        const respuestasCategoria = categorias["Pensamiento/Sentimiento"];
        const promedio = respuestasCategoria.reduce((a, b) => a + b, 0) / respuestasCategoria.length;
        
        let descripcion;
        if (promedio < 1.5) {
            descripcion = "Tu estilo de toma de decisiones se inclina hacia el pensamiento lógico. Priorizas la objetividad, la coherencia y el análisis racional al evaluar situaciones.";
        } else {
            descripcion = "Tu estilo de toma de decisiones se basa principalmente en valores personales y consideraciones emocionales. Eres empático y tomas en cuenta el impacto en las personas.";
        }
        
        resultadosCategorias.push({
            nombre: "Estilo de Toma de Decisiones",
            descripcion: descripcion
        });
    }
    
    // Análisis de Percepción/Juicio
    if (categorias["Percepción/Juicio"]) {
        const respuestasCategoria = categorias["Percepción/Juicio"];
        const promedio = respuestasCategoria.reduce((a, b) => a + b, 0) / respuestasCategoria.length;
        
        let descripcion;
        if (promedio < 1.5) {
            descripcion = "Tienes un enfoque estructurado para resolver problemas. Prefieres planes definidos y métodos organizados para abordar desafíos.";
        } else {
            descripcion = "Tu enfoque para resolver problemas es flexible y adaptable. Eres espontáneo y te sientes cómodo improvisando según evoluciona la situación.";
        }
        
        resultadosCategorias.push({
            nombre: "Enfoque de Resolución de Problemas",
            descripcion: descripcion
        });
    }
    
    // Análisis de Estructura/Flexibilidad
    if (categorias["Estructura/Flexibilidad"]) {
        const respuestasCategoria = categorias["Estructura/Flexibilidad"];
        const promedio = respuestasCategoria.reduce((a, b) => a + b, 0) / respuestasCategoria.length;
        
        let descripcion;
        if (promedio < 1.5) {
            descripcion = "Valoras la organización y el orden en tu entorno. Te sientes más cómodo cuando las cosas están planificadas y estructuradas.";
        } else {
            descripcion = "Eres flexible y te adaptas fácilmente a cambios. No necesitas un alto grado de estructura para sentirte cómodo y productivo.";
        }
        
        resultadosCategorias.push({
            nombre: "Preferencia por Estructura",
            descripcion: descripcion
        });
    }
    
    // Análisis de Comunicación
    if (categorias["Comunicación"]) {
        const respuestasCategoria = categorias["Comunicación"];
        const promedio = respuestasCategoria.reduce((a, b) => a + b, 0) / respuestasCategoria.length;
        
        let descripcion;
        if (promedio < 1) {
            descripcion = "Tu estilo comunicativo es directo y asertivo. Expresas tus ideas de manera clara y sin rodeos.";
        } else if (promedio < 2) {
            descripcion = "Eres un comunicador empático que considera cuidadosamente el impacto de sus palabras en los demás.";
        } else if (promedio < 3) {
            descripcion = "Utilizas un estilo comunicativo creativo, empleando metáforas y ejemplos para ilustrar tus puntos.";
        } else {
            descripcion = "Eres un comunicador reflexivo que prioriza escuchar antes de expresar tus propias ideas.";
        }
        
        resultadosCategorias.push({
            nombre: "Estilo de Comunicación",
            descripcion: descripcion
        });
    }
    
    // Perfil general
    let perfilGeneral = "Basado en tus respuestas, tu perfil sugiere una personalidad ";
    
    // Determinar características predominantes
    const caracteristicas = [];
    
    if (categorias["Extraversión/Introversión"] && 
        categorias["Extraversión/Introversión"].reduce((a, b) => a + b, 0) / categorias["Extraversión/Introversión"].length < 1.5) {
        caracteristicas.push("sociable");
    } else {
        caracteristicas.push("reflexiva");
    }
    
    if (categorias["Pensamiento/Sentimiento"] && 
        categorias["Pensamiento/Sentimiento"].reduce((a, b) => a + b, 0) / categorias["Pensamiento/Sentimiento"].length < 1.5) {
        caracteristicas.push("analítica");
    } else {
        caracteristicas.push("empática");
    }
    
    if (categorias["Estructura/Flexibilidad"] && 
        categorias["Estructura/Flexibilidad"].reduce((a, b) => a + b, 0) / categorias["Estructura/Flexibilidad"].length < 1.5) {
        caracteristicas.push("organizada");
    } else {
        caracteristicas.push("adaptable");
    }
    
    perfilGeneral += caracteristicas.join(", ") + ". ";
    
    perfilGeneral += "Este perfil refleja tus tendencias naturales en diferentes situaciones, aunque es importante recordar que la personalidad es dinámica y puede variar según el contexto.";
    
    // Recomendaciones
    let recomendaciones = "";
    
    if (caracteristicas.includes("sociable") && caracteristicas.includes("organizada")) {
        recomendaciones = "Podrías aprovechar tus habilidades organizativas y sociales en roles de liderazgo o coordinación. Considera buscar oportunidades donde puedas estructurar proyectos mientras interactúas con diferentes personas.";
    } else if (caracteristicas.includes("reflexiva") && caracteristicas.includes("analítica")) {
        recomendaciones = "Tu combinación de reflexión y análisis podría ser valiosa en roles que requieran investigación, planificación estratégica o resolución de problemas complejos. Busca entornos que valoren la profundidad de pensamiento.";
    } else if (caracteristicas.includes("sociable") && caracteristicas.includes("empática")) {
        recomendaciones = "Tus habilidades sociales y empatía son ideales para roles que impliquen trabajo con personas, como enseñanza, atención al cliente o trabajo comunitario. Considera desarrollar aún más tus habilidades de comunicación emocional.";
    } else if (caracteristicas.includes("reflexiva") && caracteristicas.includes("adaptable")) {
        recomendaciones = "Tu capacidad para reflexionar profundamente mientras mantienes flexibilidad es valiosa en entornos dinámicos. Podrías destacar en roles que requieran adaptación constante junto con análisis cuidadoso.";
    } else {
        recomendaciones = "Tu combinación única de características te permite abordar situaciones desde múltiples perspectivas. Busca oportunidades que te permitan utilizar tus diversas habilidades y continúa desarrollando aquellas áreas que te interesen.";
    }
    
    recomendaciones += " Recuerda que este es solo un punto de partida para el autoconocimiento, y tu personalidad continuará evolucionando a lo largo de tu vida.";
    
    return {
        perfilGeneral: perfilGeneral,
        categorias: resultadosCategorias,
        recomendaciones: recomendaciones
    };
}

function reiniciarEvaluacion() {
    preguntaActual = 0;
    respuestas = {};
    document.getElementById('resultados').classList.remove('active');
    document.getElementById('presentacion').classList.add('active');
}