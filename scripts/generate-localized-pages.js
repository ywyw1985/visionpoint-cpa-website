const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const site = "https://visionpointcpa.com";
const brand = "VISIONPOINT TAX & ACCOUNTING INCORPORATED";
const slugs = ["", "services", "tax-planning", "business-advisory", "resources", "insights", "about", "contact", "privacy", "terms", "disclaimer", "florida-cpa", "small-business-cpa", "florida-tax-planning", "bookkeeping-cleanup"];
const languages = {
  en: { base: "", label: "EN", lang: "en", nav: ["Services", "Tax Planning", "Advisory", "Resources", "Insights", "About", "Contact"], footer: ["Privacy Policy", "Terms of Use", "Disclaimer"], preview: "Website preview. Content is for general information only and does not create a CPA-client relationship." },
  es: { base: "/es", label: "ES", lang: "es", nav: ["Servicios", "Planificación fiscal", "Asesoría", "Recursos", "Perspectivas", "Acerca de", "Contacto"], footer: ["Política de privacidad", "Términos de uso", "Aviso legal"], preview: "Sitio web en versión preliminar. El contenido es solo información general y no crea una relación cliente-CPA." },
  zh: { base: "/zh", label: "中文", lang: "zh-Hans", nav: ["服务", "税务规划", "商业咨询", "资源", "洞察", "关于我们", "联系"], footer: ["隐私政策", "使用条款", "免责声明"], preview: "网站预览版。内容仅供一般信息参考，不构成 CPA 客户关系。" },
  ko: { base: "/ko", label: "한국어", lang: "ko", nav: ["서비스", "세무 계획", "자문", "자료", "인사이트", "회사 소개", "문의"], footer: ["개인정보 처리방침", "이용 약관", "면책 고지"], preview: "웹사이트 미리보기입니다. 본 내용은 일반 정보 제공용이며 CPA-고객 관계를 형성하지 않습니다." }
};

const paths = {
  "": "index.html",
  services: "services/",
  "tax-planning": "tax-planning/",
  "business-advisory": "business-advisory/",
  resources: "resources/",
  insights: "insights/",
  about: "about/",
  contact: "contact/",
  privacy: "privacy/",
  terms: "terms/",
  disclaimer: "disclaimer/",
  "florida-cpa": "florida-cpa/",
  "small-business-cpa": "small-business-cpa/",
  "florida-tax-planning": "florida-tax-planning/",
  "bookkeeping-cleanup": "bookkeeping-cleanup/"
};

const navSlugs = ["services", "tax-planning", "business-advisory", "resources", "insights", "about", "contact"];
const legalSlugs = ["privacy", "terms", "disclaimer"];
const images = {
  services: ["/assets/services-image.png", "Organized accounting reports, laptop, and financial documents in a modern CPA office."],
  "tax-planning": ["/assets/tax-planning-image.png", "Tax planning documents, calendar, laptop charts, and folders on a refined conference table."],
  "business-advisory": ["/assets/advisory-image.png", "Professionals reviewing business charts and cash flow materials in a modern advisory meeting."],
  resources: ["/assets/client-intake-image.png", "Secure client onboarding desk with document folders, tablet, checklist, and pen."],
  contact: ["/assets/client-intake-image.png", "Professional client intake materials arranged on a desk for a CPA consultation."],
  about: ["/assets/advisory-image.png", "Modern CPA advisory meeting with organized reports and business planning materials."]
};

const content = {
  es: {
    home: {
      title: `${brand} | Servicios fiscales, contables y de asesoría`,
      description: "Servicios fiscales, contables, de teneduría de libros, nómina y asesoría dirigidos por una CPA de Florida.",
      eyebrow: "Guía fiscal y contable dirigida por una CPA de Florida",
      noticeTitle: "Sitio web en construcción",
      noticeText: "Este sitio web está actualmente en desarrollo y todavía no es un canal activo para aceptar nuevos clientes. Vuelva pronto para ver novedades del lanzamiento oficial.",
      h1: "VISIONPOINT TAX & ACCOUNTING",
      intro: "Estrategia fiscal práctica, libros contables ordenados y orientación financiera constante de una Certified Public Accountant de Florida para clientes que buscan menos sorpresas y mejores decisiones.",
      cta1: "Enviar una consulta inicial",
      cta2: "Ver servicios",
      sections: [
        ["Credenciales", "Florida CPA", "Guía profesional dirigida por una Certified Public Accountant"],
        ["Planificación", "Todo el año", "Apoyo más allá de la temporada de impuestos"],
        ["Flujo seguro", "Portal del cliente", "Intercambio seguro de documentos próximamente"]
      ],
      cardsTitle: "Estándares de CPA, conversaciones prácticas.",
      cards: [
        ["Perspectiva de CPA licenciada", "Las preguntas fiscales y contables se revisan con atención a cumplimiento, planificación, documentación y responsabilidad profesional."],
        ["Planificación antes de los plazos", "Los mejores resultados fiscales suelen comenzar antes del cierre del año, cuando aún hay margen para ajustar estimados, estructura, nómina y registros."],
        ["Guía clara", "Los clientes deben entender qué cambió, qué importa, qué documentos faltan y cuál es el siguiente paso."]
      ]
    },
    pages: {
      services: ["Servicios de CPA", "Soporte contable que mantiene el negocio legible.", "Rutinas mensuales claras, registros listos para impuestos e informes prácticos para propietarios que necesitan confiar en sus números.", "Claridad mensual", "Registros profesionales, reportes útiles y menos sorpresas.", "Los servicios contables se enfocan en datos limpios, revisión oportuna y reportes que ayudan a entender los cambios antes de la temporada fiscal.", [["Libros", "Teneduría mensual", "Conexiones bancarias, conciliaciones, clasificación, notas de revisión e informes para propietarios."], ["Limpieza", "Contabilidad atrasada", "Corregir registros históricos, conciliar cuentas y preparar libros limpios para impuestos o financiamiento."], ["Nómina", "Coordinación de nómina", "Alinear nómina, contratistas, compensación del propietario y depósitos fiscales."], ["Impuestos", "Declaraciones comerciales e individuales", "Procesos basados en documentación completa y menos urgencias de último momento."], ["Reportes", "Estados financieros", "Estado de resultados, balance general, vista de flujo de efectivo y notas prácticas."], ["Apoyo", "Preguntas durante el año", "Orientación cuando una decisión empresarial tiene consecuencias contables o fiscales."]]],
      "tax-planning": ["Planificación fiscal", "Planifique antes de que la temporada fiscal tome las decisiones por usted.", "La planificación fiscal funciona mejor antes del cierre del año, cuando aún hay margen para ajustar ingresos, deducciones, estimados y estructura.", "Estrategia durante todo el año", "El trabajo fiscal debe sentirse planificado, no apresurado.", "Las conversaciones de planificación conectan el año actual, próximos plazos, ingresos del negocio y metas personales en pasos más claros.", [["Cobertura de la revisión", "Revisamos tendencias de ingresos, retenciones, pagos estimados, ingresos de entidades, opciones de jubilación, deducciones importantes, compras de activos y cambios personales o de negocio."], ["Para propietarios", "Los registros limpios facilitan hablar sobre compensación, elección de S corporation, salario razonable, contratistas y efectivo reservado para impuestos."], ["Para familias", "La planificación puede incluir inversiones, compensación en acciones, alquileres, oficina en casa, donaciones, créditos educativos y asuntos multiestatales."]]],
      "business-advisory": ["Asesoría empresarial", "Las decisiones financieras necesitan contexto, no solo reportes.", "La asesoría convierte registros contables en conversaciones con propietarios sobre efectivo, impuestos, crecimiento y decisiones operativas.", "Apoyo para decisiones", "Traducir los números en movimientos de negocio.", "Las sesiones de asesoría ayudan a leer el flujo de efectivo, evaluar estructura y tomar decisiones operativas considerando impuestos y contabilidad.", [["Flujo de efectivo", "Saber qué puede pagar el negocio", "Revisar obligaciones recurrentes, cuentas por cobrar, reservas fiscales, tiempos de nómina y distribuciones."], ["Entidad", "Alinear la estructura con la etapa del negocio", "Analizar LLC, partnership, S corporation, nómina y compensación del propietario."], ["Reportes", "Crear un ritmo que el propietario pueda usar", "Reportes mensuales, notas de variación e indicadores clave reducen la reactividad."]]],
      resources: ["Recursos", "Listas útiles antes de que empiece la reunión.", "Los recursos ayudan a los clientes a llegar preparados y dan al sitio una base natural para artículos útiles en buscadores.", "Clientes preparados", "Mejores documentos producen mejores conversaciones.", "Estas páginas orientan a los clientes hacia registros completos, intercambio seguro de documentos y menos demoras evitables.", [["Lista de documentos fiscales", "Declaración del año anterior, avisos fiscales, W-2, 1099, K-1, estados de corretaje, jubilación, alquileres, ingresos y gastos del negocio, nómina, préstamos, donaciones, intereses hipotecarios y pagos estimados."], ["Lista contable mensual", "Mantenga cuentas bancarias y tarjetas conectadas, suba recibos inusuales, revise facturas abiertas, documente transferencias del propietario y marque préstamos, activos, contratistas o cambios de nómina."], ["Contenido futuro", "Esta sección puede crecer con calendarios fiscales, guías por industria, explicaciones de avisos del IRS y educación bilingüe."]]],
      insights: ["Perspectivas", "Actualizaciones breves para mejores decisiones fiscales y contables.", "Esta sección está preparada para notas frecuentes, recordatorios fiscales, ideas de planificación y futuros destacados de redes sociales.", "Centro de actualizaciones", "Diseñado para publicaciones regulares y distribución social.", "Use esta página como base permanente y comparta resúmenes en Xiaohongshu, Instagram y LinkedIn.", [["Nota de lanzamiento", "Portal del cliente e intake en desarrollo", "VisionPoint prepara un flujo seguro para intercambio de documentos, listas de revisión y comunicación futura."], ["Planificación", "La planificación fiscal empieza antes de los plazos", "Estimados, estructura, jubilación y registros limpios son más fáciles de revisar antes de la presión fiscal."], ["Registros", "Mejores documentos mejoran las conversaciones con la CPA", "Declaraciones anteriores, avisos, actividad bancaria, nómina y transacciones importantes reducen idas y vueltas."]]],
      about: ["Acerca de", "Guía fiscal y contable centrada en el cliente, construida con disciplina.", "VisionPoint es una firma dirigida por una CPA de Florida, enfocada en servicio ágil, flujos eficientes y juicio profesional de calidad.", "Estándar de la firma", "El servicio debe sentirse organizado, claro y responsable.", "La experiencia del cliente se diseña alrededor de registros cuidadosos, comunicación directa, planificación proactiva y recomendaciones prácticas.", [["Misión", "Hacer que el trabajo fiscal y contable sea más comprensible y manejable.", "VisionPoint ayuda a los clientes a organizarse, cumplir obligaciones, planificar y decidir con información más limpia."], ["Visión", "Construir una firma moderna donde la calidad del servicio y la confianza crezcan con el tiempo.", "El objetivo es ser reconocidos por capacidad de respuesta, trabajo disciplinado, explicaciones claras y guía durante todo el año."], ["Promesa", "Poner al cliente primero sin comprometer estándares profesionales.", "El servicio debe ser práctico y humano, con registros sólidos, revisión y cuidado profesional detrás."]]],
      contact: ["Contacto", "Consultas iniciales y actualizaciones de lanzamiento.", "Esta página muestra datos temporales mientras se prepara el proceso completo de intake y portal seguro.", "Intake de cliente", "Una primera conversación enfocada ahorra tiempo.", "Use el correo temporal para preguntas generales o actualizaciones. No envíe documentos fiscales sensibles hasta que haya un portal seguro.", [["Email", "antoao208@gmail.com", "Correo temporal mientras el sitio está en desarrollo."], ["Teléfono", "No disponible todavía", "El contacto telefónico aún no está disponible."], ["Oficina", "Con cita previa", "La atención presencial se definirá antes del lanzamiento completo."]]],
      privacy: ["Política de privacidad", "Política de privacidad", "Esta política describe cómo este sitio preliminar puede recopilar y usar información básica.", "", "", "", [["Información que podemos recibir", "Si contacta a VisionPoint, podemos recibir su nombre, email, mensaje y otra información que decida proporcionar. No envíe documentos fiscales sensibles hasta que exista un canal seguro."], ["Uso de la información", "La información puede usarse para responder consultas, preparar futuros flujos de intake, mejorar contenido y comunicar novedades."], ["Protección de datos", "VisionPoint planea usar salvaguardas administrativas y técnicas razonables antes de aceptar documentos sensibles."]]],
      terms: ["Términos de uso", "Términos de uso", "Estos términos establecen expectativas para el uso del sitio mientras VisionPoint prepara su lanzamiento.", "", "", "", [["Información general", "El contenido es informativo y no debe tratarse como asesoría fiscal, contable, legal, de inversión o financiera para una situación específica."], ["Sin relación cliente-CPA", "Ver el sitio, enviar un email o leer contenido no crea una relación cliente-CPA. Se requiere aceptación y acuerdo escrito."], ["Sin documentos sensibles", "No envíe documentos fiscales sensibles, números de Seguro Social, datos de cuentas ni registros confidenciales hasta contar con un canal seguro aprobado."]]],
      disclaimer: ["Aviso legal", "Aviso legal del sitio web", "Este sitio está en desarrollo y no ofrece asesoría fiscal o contable personalizada.", "", "", "", [["Sin asesoría profesional", "La información es general. Las decisiones fiscales y contables dependen de hechos, documentos, tiempos y leyes aplicables."], ["Sin garantía de resultados", "Ejemplos, temas de planificación, listas y contenido educativo no garantizan ahorros, posiciones fiscales ni resultados empresariales."], ["Se requiere compromiso formal", "La asesoría profesional requiere revisar hechos relevantes y formalizar un engagement. Hasta entonces, las comunicaciones son consultas generales."]]],
      "florida-cpa": ["Servicios de CPA en Florida", "Guía de CPA en Florida para impuestos, contabilidad y decisiones empresariales.", "VisionPoint se está preparando para ofrecer planificación fiscal, soporte contable y conversaciones de asesoría con enfoque en Florida.", "", "", "", [["Soporte fiscal y contable en Florida", "Los clientes de Florida suelen necesitar conectar reglas fiscales federales, estructura de negocio, flujo de efectivo, nómina, contabilidad y documentación."], ["Qué puede incluir", "Planificación fiscal individual y empresarial, limpieza de libros, soporte mensual, recordatorios de impuestos estimados y conversaciones sobre entidad y compensación."], ["Estado actual", "Esta página forma parte del sitio preliminar; el intake completo y el intercambio seguro aún se preparan."]]],
      "small-business-cpa": ["CPA para pequeñas empresas", "Soporte contable que ayuda a los propietarios a ver el negocio con claridad.", "La contabilidad de pequeñas empresas funciona mejor cuando libros, impuestos, nómina y asesoría están conectados.", "", "", "", [["Para propietarios que necesitan números útiles", "VisionPoint prepara servicios para negocios que necesitan libros limpios, registros listos para impuestos y mejor visibilidad de flujo de efectivo."], ["Necesidades comunes", "Limpieza antes de declarar, cierres mensuales, conciliaciones, coordinación de nómina, contratistas, estimados y distribuciones."], ["Flujo de calidad", "El objetivo es reducir incertidumbre con solicitudes organizadas, notas prácticas y explicaciones claras."]]],
      "florida-tax-planning": ["Planificación fiscal en Florida", "Planifique antes de que la temporada fiscal comprima cada decisión.", "La planificación ayuda a revisar estimados, ingresos, jubilación, entidad y registros antes de los plazos.", "", "", "", [["Temas de planificación", "La planificación efectiva empieza con ingresos actuales, retenciones, estimados, utilidad del negocio, nómina, jubilación, deducciones y cambios relevantes."], ["Para propietarios", "Los libros limpios hacen más útil la planificación de compensación, distribuciones, contratistas e impuestos estimados."], ["Para individuos y familias", "Puede incluir inversiones, asuntos multiestatales, acciones, alquileres, donaciones, créditos educativos y pagos estimados."]]],
      "bookkeeping-cleanup": ["Limpieza contable", "Registros limpios crean mejores conversaciones fiscales y empresariales.", "La contabilidad atrasada puede convertir registros confusos en reportes más fáciles de revisar, planificar y declarar.", "", "", "", [["Cuándo puede necesitarse", "Cuentas sin conciliar, transferencias del propietario poco claras, mezcla de gastos personales y de negocio, o reportes que no coinciden con bancos o impuestos."], ["Qué puede apoyar", "Registros limpios apoyan preparación fiscal, financiamiento, revisión de efectivo, estimados y mejores decisiones."], ["Estado actual", "VisionPoint prepara un flujo seguro para intercambio futuro de documentos y revisión contable."]]]
    }
  },
  zh: {
    home: {
      title: `${brand} | 税务、会计与咨询服务`,
      description: "由佛州 CPA 主导的税务规划、会计、记账、工资协调和商业咨询服务。",
      eyebrow: "由佛州 CPA 主导的税务与会计服务",
      noticeTitle: "网站建设中",
      noticeText: "本网站目前仍在建设中，暂未作为正式接收新客户的业务入口。请稍后查看正式上线信息。",
      h1: "VISIONPOINT TAX & ACCOUNTING",
      intro: "由佛州 Certified Public Accountant 提供务实的税务策略、清晰的账务整理和稳定的财务指导，帮助客户减少意外、做出更好的决定。",
      cta1: "发送初步咨询",
      cta2: "查看服务",
      sections: [["资质", "佛州 CPA", "由 Certified Public Accountant 主导的专业服务"], ["全年规划", "不只报税季", "把税务规划放在截止日期之前"], ["安全流程", "客户门户", "安全文件交换功能即将上线"]],
      cardsTitle: "CPA 标准，清楚实用的沟通。",
      cards: [["持证 CPA 视角", "税务和会计问题会从合规、规划、资料留存和专业责任角度审阅。"], ["截止日期前规划", "好的税务结果通常在年底前开始准备，那时仍有空间调整预缴税、公司结构、工资和账务。"], ["清楚易懂的说明", "客户应该知道发生了什么、哪些事项重要、需要哪些文件，以及下一步怎么做。"]]
    },
    pages: {
      services: ["CPA 服务", "让企业账务变得清楚可读。", "清晰的月度流程、可用于报税的记录，以及企业主真正能用的财务报告。", "月度清晰度", "专业记录、实用报告，减少意外。", "会计服务围绕干净数据、及时复核和可理解的报告展开，帮助企业主在报税季前看清变化。", [["记账", "月度记账", "银行流水、对账、分类、复核备注和企业主可读报告。"], ["清理", "补账与账务清理", "修正历史记录、对账，并为报税或融资准备清晰账本。"], ["工资", "工资协调", "协助梳理工资设置、承包商追踪、业主薪酬和税款缴纳。"], ["税务", "企业与个人税表", "以完整资料为基础，减少最后一刻的混乱。"], ["报表", "财务报表", "损益表、资产负债表、现金流视角和可执行的说明。"], ["支持", "全年问题支持", "当业务决策涉及会计或税务影响时，提供及时指导。"]]],
      "tax-planning": ["税务规划", "不要等报税季替你做决定。", "税务规划最好在年度结束前进行，那时仍可调整收入、扣除、预缴税和结构。", "全年策略", "税务工作应该有计划，而不是被截止日期推着走。", "规划会把本年度情况、未来截止日期、企业收入和个人目标连接成清晰步骤。", [["规划审阅内容", "审阅收入趋势、预扣税和预缴税、企业收入、退休账户选项、主要扣除、资产购买和可能影响报税的生活或业务变化。"], ["企业主", "干净账务让业主薪酬、S corporation 选择、合理工资、承包商处理和税款现金准备更容易讨论。"], ["个人与家庭", "可包括投资收入、股权激励、出租房、家庭办公室、慈善捐赠、教育抵免和跨州事项。"]]],
      "business-advisory": ["商业咨询", "财务决策需要背景，不只是报表。", "咨询服务把会计记录转化为关于现金、税务、增长和运营取舍的企业主对话。", "决策支持", "把数字转化为业务行动。", "咨询会议帮助企业主理解现金流、评估结构，并在税务与会计影响下做运营决策。", [["现金流", "知道企业能承担什么", "审阅固定支出、应收账款、税款储备、工资时间和业主分配。"], ["实体", "让结构匹配企业阶段", "讨论 LLC、合伙、S corporation、工资和业主薪酬问题。"], ["报告", "建立企业主能使用的节奏", "月度报告、差异说明和关键指标可以减少被动反应。"]]],
      resources: ["资源", "会议前可用的资料清单。", "资源页面帮助客户提前准备，也为网站建立适合搜索的专业内容基础。", "准备充分的客户", "更好的文件带来更好的沟通。", "资源页面引导客户准备完整记录、安全文件分享，并减少报税或规划过程中的不必要延误。", [["税务资料清单", "上一年度税表、税务通知、W-2、1099、K-1、券商、退休、出租活动、企业收入费用、资产购买、工资报表、贷款资料、捐赠、教育费用、房贷利息、房产税和预缴税。"], ["月度会计清单", "保持银行和信用卡连接，上传特殊采购收据，检查未收款发票，记录业主转账，并标记新贷款、资产、承包商或工资变化。"], ["未来内容", "此区域可扩展为税务日历、行业指南、IRS 通知解释和多语言客户教育。"]]],
      insights: ["洞察", "帮助做出更好税务与会计决策的短内容。", "这里用于发布公司动态、税务提醒、规划思路和未来社媒内容。", "更新中心", "适合定期发布并分发到社交平台。", "网站保留完整版本，随后可把短版同步到小红书、Instagram 和 LinkedIn。", [["上线说明", "客户门户和 intake 流程正在准备", "VisionPoint 正在准备安全文件交换、清单和客户沟通流程。"], ["规划", "全年税务规划应早于截止日期", "预缴税、实体结构、退休账户和干净账务在报税压力到来前更容易复核。"], ["记录", "更好的文件让 CPA 沟通更有效", "往年税表、通知、银行流水、工资报表和重大交易记录能减少来回补资料。"]]],
      about: ["关于我们", "以客户为先、以纪律建立的税务与会计服务。", "VisionPoint 是由佛州 CPA 主导的事务所，重视响应速度、效率流程和质量优先的专业判断。", "事务所标准", "服务应当有组织、清楚、可负责。", "客户体验围绕细致记录、直接沟通、主动规划和兼顾准确性与时间的实用建议设计。", [["使命", "让税务和会计工作更容易理解、更容易管理。", "VisionPoint 帮助客户保持有序、履行义务、提前规划，并基于更干净的财务信息做决定。"], ["愿景", "建立一家现代 CPA firm，让服务质量和客户信任长期累积。", "长期目标是以响应、严谨、清楚解释和全年指导建立口碑。"], ["承诺", "客户第一，但不牺牲专业标准。", "服务应当务实且有人情味，同时每个建议背后都需要可靠记录、复核和专业谨慎。"]]],
      contact: ["联系", "初步咨询与上线进度。", "在完整 intake 流程和安全客户门户准备期间，本页列出临时联系方式。", "客户 intake", "聚焦的第一次沟通可以节省时间。", "可使用临时邮箱发送一般问题或获取上线更新。请不要在安全客户门户上线前发送敏感税务文件。", [["邮箱", "antoao208@gmail.com", "网站建设期间临时使用的联系邮箱。"], ["电话", "暂未提供", "网站建设期间目前不提供电话联系。"], ["办公室", "预约制", "完整上线前将进一步确定办公安排。"]]],
      privacy: ["隐私政策", "隐私政策", "本政策说明预览网站可能如何收集和使用基本信息。", "", "", "", [["可能收集的信息", "如果您联系 VisionPoint，我们可能收到您的姓名、邮箱、留言内容以及您选择提供的其他信息。请勿在安全渠道建立前发送敏感税务文件。"], ["信息用途", "信息可能用于回复咨询、准备未来客户 intake 流程、改进网站内容和发送事务所更新。"], ["数据保护", "VisionPoint 计划在接受敏感文件前采用合理的行政和技术保护措施。"]]],
      terms: ["使用条款", "使用条款", "这些条款说明 VisionPoint 准备上线期间的网站使用预期。", "", "", "", [["仅一般信息", "网站内容仅供一般信息参考，不应被视为针对具体情况的税务、会计、法律、投资或财务建议。"], ["不形成客户关系", "浏览网站、发送邮件或阅读内容不形成 CPA 客户关系。客户关系需要接受并签署书面协议。"], ["不要提交敏感资料", "在安全客户门户或批准的安全渠道可用前，请勿提交敏感税务文件、社安号、账户信息或保密记录。"]]],
      disclaimer: ["免责声明", "网站免责声明", "本网站仍在建设中，不提供个性化税务或会计建议。", "", "", "", [["非专业建议", "网站信息属于一般性质。税务和会计决定取决于具体事实、文件、时间和适用法律。"], ["不保证结果", "示例、规划主题、清单和教育内容不保证节税、申报立场或业务结果。"], ["需要正式委托", "专业建议需要审阅相关事实并建立正式委托。在此之前，沟通仅属于一般咨询。"]]],
      "florida-cpa": ["佛州 CPA 服务", "面向佛州客户的税务、会计和商业决策指导。", "VisionPoint 正在准备为客户提供有组织的税务规划、会计支持和咨询沟通。", "", "", "", [["佛州税务与会计支持", "佛州客户通常需要把联邦税法、企业结构、现金流、工资、记账和文件记录结合起来。"], ["服务可能包括", "个人与企业税务规划、账务清理、月度会计、预缴税提醒、实体结构和业主薪酬讨论。"], ["当前状态", "本页属于网站预览版，完整 intake 和安全文件交换仍在准备中。"]]],
      "small-business-cpa": ["小型企业 CPA", "帮助企业主清楚看懂业务的会计支持。", "当记账、税务规划、工资和咨询连接起来时，小型企业会计才更有价值。", "", "", "", [["需要实用数字的企业主", "VisionPoint 正在为需要干净账务、报税准备记录和现金流可见度的企业主准备服务。"], ["常见需求", "报税前账务清理、月度结账、对账、工资协调、承包商追踪、预缴税和业主分配讨论。"], ["质量优先流程", "目标是通过有组织的资料请求、实用复核说明和清楚解释减少不确定性。"]]],
      "florida-tax-planning": ["佛州税务规划", "在报税季压缩每个决定之前先规划。", "税务规划帮助个人和企业主在截止日期前审阅预缴税、收入时间、退休账户、实体问题和账务记录。", "", "", "", [["规划主题", "有效规划从事实开始：本年度收入、预扣税、预缴税、企业利润、工资、退休计划、扣除和重大变化。"], ["企业主", "干净账务让业主薪酬、分配、承包商处理和预缴税讨论更有用。"], ["个人与家庭", "可能包括投资收入、跨州问题、股权激励、出租活动、慈善捐赠、教育抵免和预缴税。"]]],
      "bookkeeping-cleanup": ["账务清理", "干净记录带来更好的税务与商业沟通。", "补账和账务清理可以把混乱记录转化为更易审阅、规划和报税的报告。", "", "", "", [["何时需要清理", "银行或信用卡未对账、业主转账或贷款不清楚、个人和企业交易混在一起、报表与税表或银行不一致。"], ["可支持事项", "干净记录可支持税务准备、融资申请、现金流审阅、预缴税规划和更好的企业决策。"], ["当前状态", "VisionPoint 正在准备未来文件交换和会计审阅的安全 intake 流程。"]]]
    }
  },
  ko: {
    home: {
      title: `${brand} | 세무, 회계 및 자문 서비스`,
      description: "플로리다 CPA가 이끄는 세무 계획, 회계, 장부 정리, 급여 조정 및 비즈니스 자문 서비스.",
      eyebrow: "플로리다 CPA가 이끄는 세무 및 회계 안내",
      noticeTitle: "웹사이트 구축 중",
      noticeText: "이 웹사이트는 현재 구축 중이며 아직 신규 고객을 공식적으로 접수하는 채널이 아닙니다. 공식 출시 소식을 위해 다시 방문해 주세요.",
      h1: "VISIONPOINT TAX & ACCOUNTING",
      intro: "플로리다 Certified Public Accountant가 제공하는 실용적인 세무 전략, 정리된 장부, 일관된 재무 안내로 더 적은 불확실성과 더 나은 결정을 돕습니다.",
      cta1: "초기 문의 보내기",
      cta2: "서비스 보기",
      sections: [["자격", "Florida CPA", "Certified Public Accountant가 이끄는 전문 안내"], ["연중 지원", "세금 시즌을 넘어", "마감일 이전부터 시작하는 계획"], ["보안 절차", "고객 포털", "안전한 문서 교환 준비 중"]],
      cardsTitle: "CPA 기준과 실용적인 소통.",
      cards: [["면허 CPA 관점", "세무와 회계 질문은 준수, 계획, 문서화, 전문 책임의 관점에서 검토됩니다."], ["마감 전 계획", "좋은 세무 결과는 대개 연말 전에 시작되며, 그때는 추정세, 구조, 급여, 기록을 조정할 여지가 있습니다."], ["명확한 설명", "고객은 무엇이 바뀌었는지, 무엇이 중요한지, 어떤 문서가 필요한지, 다음 단계가 무엇인지 이해해야 합니다."]]
    },
    pages: {
      services: ["CPA 서비스", "사업을 읽을 수 있게 만드는 회계 지원.", "명확한 월간 절차, 세금 신고에 준비된 기록, 사업주가 신뢰할 수 있는 실용적 보고.", "월간 명확성", "전문적인 기록, 유용한 보고서, 줄어드는 예외 상황.", "회계 서비스는 깨끗한 데이터, 적시 검토, 세금 시즌 전에 변화를 이해할 수 있는 보고를 중심으로 구성됩니다.", [["장부", "월간 장부 관리", "은행 연결, 대사, 분류, 검토 메모와 사업주용 보고."], ["정리", "지연 장부 정리", "과거 기록을 수정하고 계정을 대사하여 세금 신고나 금융 신청에 사용할 수 있는 장부를 준비합니다."], ["급여", "급여 조정", "급여 설정, 계약자 추적, 사업주 보상 및 세금 납부를 정리합니다."], ["세무", "개인 및 사업 세금 신고", "완전한 문서에 기반한 절차로 마지막 순간의 혼란을 줄입니다."], ["보고", "재무제표", "손익계산서, 재무상태표, 현금흐름 관점과 실행 가능한 메모."], ["지원", "연중 질문", "사업 결정에 회계 또는 세무 영향이 있을 때 대응합니다."]]],
      "tax-planning": ["세무 계획", "세금 시즌이 결정을 대신하기 전에 계획하십시오.", "세무 계획은 연말 전에 진행할 때 가장 효과적이며, 그때는 소득, 공제, 추정세, 구조를 조정할 여지가 있습니다.", "연중 전략", "세무 업무는 급하게 처리되는 것이 아니라 계획되어야 합니다.", "계획 논의는 현재 연도, 다가오는 마감일, 사업 소득, 개인 목표를 더 명확한 다음 단계로 연결합니다.", [["검토 범위", "소득 추세, 원천징수와 추정세, 법인 소득, 은퇴 계좌 선택지, 주요 공제, 자산 구매, 신고에 영향을 줄 수 있는 생활 또는 사업 변화를 검토합니다."], ["사업주", "깨끗한 기록은 사업주 보상, S corporation 선택, 합리적 급여, 계약자 처리, 향후 세금 현금 준비 논의를 쉽게 만듭니다."], ["개인과 가족", "투자 소득, 주식 보상, 임대 활동, 홈오피스 사실관계, 기부, 교육 공제, 다주 이슈가 포함될 수 있습니다."]]],
      "business-advisory": ["비즈니스 자문", "재무 결정에는 보고서뿐 아니라 맥락이 필요합니다.", "자문은 회계 기록을 현금, 세금, 성장, 운영 선택에 관한 사업주 대화로 바꿉니다.", "의사결정 지원", "숫자를 사업 결정으로 연결합니다.", "자문 세션은 현금흐름을 읽고 구조를 평가하며 세무와 회계 영향을 고려한 운영 결정을 돕습니다.", [["현금흐름", "사업이 감당할 수 있는 범위 파악", "반복 지출, 미수금, 세금 준비금, 급여 시점, 사업주 분배를 검토합니다."], ["법적 구조", "사업 단계에 맞는 구조", "LLC, partnership, S corporation, 급여와 사업주 보상을 논의합니다."], ["보고", "사업주가 사용할 수 있는 리듬", "월간 보고, 차이 분석 메모, 핵심 지표는 재무 업무를 덜 수동적으로 만듭니다."]]],
      resources: ["자료", "미팅 전에 유용한 체크리스트.", "자료 페이지는 고객이 준비된 상태로 오도록 돕고 검색 친화적인 콘텐츠 기반을 제공합니다.", "준비된 고객", "좋은 문서가 좋은 대화를 만듭니다.", "이 페이지는 완전한 기록, 안전한 문서 공유, 신고 또는 계획 과정의 불필요한 지연 감소를 안내합니다.", [["세무 문서 체크리스트", "전년도 신고서, 세무 통지, W-2, 1099, K-1, 증권, 은퇴, 임대 활동 자료, 사업 수입과 비용, 자산 구매, 급여 보고서, 대출 자료, 기부, 교육비, 모기지 이자, 재산세 및 추정세."], ["월간 회계 체크리스트", "은행과 카드 계정을 연결하고, 특이한 구매 영수증을 업로드하며, 미수 청구서를 검토하고, 사업주 이체와 신규 대출, 자산, 계약자, 급여 변화를 표시합니다."], ["향후 콘텐츠", "세무 일정, 업종별 가이드, IRS 통지 설명, 다국어 고객 교육으로 확장할 수 있습니다."]]],
      insights: ["인사이트", "더 나은 세무 및 회계 결정을 위한 짧은 업데이트.", "이 섹션은 회사 소식, 세무 알림, 계획 아이디어, 향후 소셜 미디어 하이라이트를 위해 준비되었습니다.", "업데이트 허브", "정기 게시와 소셜 배포를 위해 설계되었습니다.", "웹사이트를 영구 버전의 기준으로 두고 Xiaohongshu, Instagram, LinkedIn에는 요약본을 공유할 수 있습니다.", [["출시 메모", "고객 포털과 intake 절차 준비 중", "VisionPoint는 향후 문서 교환, 체크리스트, 고객 커뮤니케이션을 위한 안전한 절차를 준비하고 있습니다."], ["계획", "연중 세무 계획은 마감 전부터 시작됩니다", "추정세, 법인 구조, 은퇴 기여, 깨끗한 기록은 세금 시즌 압박 전에 검토하기 쉽습니다."], ["기록", "좋은 문서는 CPA 대화를 개선합니다", "전년도 신고서, 통지, 은행 활동, 급여 보고서, 주요 거래 기록은 추가 요청을 줄입니다."]]],
      about: ["회사 소개", "고객 우선의 세무 및 회계 안내를 체계적으로 구축합니다.", "VisionPoint는 플로리다 CPA가 이끄는 회사로, 신속한 서비스, 효율적인 절차, 품질 우선의 전문 판단을 중심으로 합니다.", "회사 기준", "서비스는 체계적이고 명확하며 책임 있게 느껴져야 합니다.", "고객 경험은 세심한 기록, 직접적인 소통, 선제적 계획, 정확성과 시간을 모두 고려한 실용적 권고를 중심으로 설계됩니다.", [["미션", "세무와 회계 업무를 더 이해하기 쉽고 관리하기 쉽게 만듭니다.", "VisionPoint는 고객이 정리된 상태를 유지하고 의무를 이행하며 미리 계획하고 더 깨끗한 재무 정보로 결정하도록 돕습니다."], ["비전", "서비스 품질과 고객 신뢰가 시간이 지날수록 쌓이는 현대적 CPA firm을 구축합니다.", "장기 목표는 대응력, 체계적 업무, 명확한 설명, 연중 안내로 알려지는 회사입니다."], ["약속", "전문 기준을 낮추지 않으면서 고객을 우선합니다.", "서비스는 실용적이고 인간적이어야 하지만, 모든 권고 뒤에는 확실한 기록, 검토, 전문적 주의가 있어야 합니다."]]],
      contact: ["문의", "초기 문의와 출시 업데이트.", "전체 intake 절차와 보안 고객 포털을 준비하는 동안 임시 연락 정보를 제공합니다.", "고객 intake", "집중된 첫 대화는 시간을 절약합니다.", "일반 질문이나 출시 업데이트는 임시 이메일을 이용해 주세요. 보안 포털이 준비되기 전에는 민감한 세무 문서를 보내지 마십시오.", [["이메일", "antoao208@gmail.com", "웹사이트 구축 중 임시 연락 이메일입니다."], ["전화", "아직 제공되지 않음", "현재 전화 연락은 제공되지 않습니다."], ["사무실", "예약제", "정식 출시 전에 사무실 운영 방식이 확정될 예정입니다."]]],
      privacy: ["개인정보 처리방침", "개인정보 처리방침", "이 방침은 미리보기 웹사이트가 기본 정보를 수집하고 사용할 수 있는 방식을 설명합니다.", "", "", "", [["수집할 수 있는 정보", "VisionPoint에 연락하면 이름, 이메일, 메시지 내용 및 사용자가 제공한 기타 정보를 받을 수 있습니다. 보안 채널이 마련되기 전에는 민감한 세무 문서를 보내지 마십시오."], ["정보 사용", "정보는 문의 응답, 향후 고객 intake 절차 준비, 웹사이트 콘텐츠 개선, 회사 업데이트 전달에 사용될 수 있습니다."], ["데이터 보호", "VisionPoint는 민감한 문서를 받기 전에 합리적인 관리적 및 기술적 보호 조치를 사용할 예정입니다."]]],
      terms: ["이용 약관", "이용 약관", "이 약관은 VisionPoint가 출시를 준비하는 동안 웹사이트 사용에 대한 기대 사항을 정합니다.", "", "", "", [["일반 정보", "웹사이트 콘텐츠는 일반 정보 제공용이며 특정 상황에 대한 세무, 회계, 법률, 투자 또는 재무 조언으로 보아서는 안 됩니다."], ["고객 관계 없음", "웹사이트를 보거나 이메일을 보내거나 콘텐츠를 읽는 것만으로 CPA-고객 관계가 형성되지 않습니다. 서면 계약이 필요합니다."], ["민감 자료 제출 금지", "보안 고객 포털 또는 승인된 보안 채널이 준비되기 전에는 민감한 세무 문서, 사회보장번호, 계좌 정보, 기밀 기록을 제출하지 마십시오."]]],
      disclaimer: ["면책 고지", "웹사이트 면책 고지", "이 웹사이트는 구축 중이며 개인화된 세무 또는 회계 조언을 제공하지 않습니다.", "", "", "", [["전문 조언 아님", "이 웹사이트의 정보는 일반적인 성격입니다. 세무 및 회계 결정은 구체적 사실, 문서, 시점, 적용 법률에 따라 달라집니다."], ["결과 보장 없음", "예시, 계획 주제, 체크리스트, 교육 콘텐츠는 세금 결과, 절감, 신고 입장 또는 사업 성과를 보장하지 않습니다."], ["공식 계약 필요", "전문 조언은 관련 사실 검토와 공식 engagement가 필요합니다. 그 전까지 커뮤니케이션은 일반 문의로 보아야 합니다."]]],
      "florida-cpa": ["플로리다 CPA 서비스", "플로리다 고객을 위한 세무, 회계 및 사업 결정 안내.", "VisionPoint는 명확한 세무 계획, 회계 지원, 자문 대화를 제공하기 위해 준비 중입니다.", "", "", "", [["플로리다 중심 세무 및 회계 지원", "플로리다 고객은 연방 세법, 사업 구조, 현금흐름, 급여, 장부, 문서화를 함께 고려해야 하는 경우가 많습니다."], ["포함될 수 있는 서비스", "개인 및 사업 세무 계획, 장부 정리, 월간 회계 지원, 추정세 알림, 법인 구조와 사업주 보상 논의."], ["현재 상태", "이 페이지는 웹사이트 미리보기의 일부이며 전체 intake와 보안 파일 교환은 아직 준비 중입니다."]]],
      "small-business-cpa": ["소기업 CPA", "사업주가 사업을 명확하게 볼 수 있도록 돕는 회계 지원.", "장부, 세무 계획, 급여, 자문이 연결될 때 소기업 회계가 가장 잘 작동합니다.", "", "", "", [["사용 가능한 숫자가 필요한 사업주", "VisionPoint는 깨끗한 장부, 세금 준비 기록, 현금흐름과 의무에 대한 가시성이 필요한 사업주를 위한 서비스를 준비 중입니다."], ["일반적 필요", "신고 전 장부 정리, 월간 마감, 대사, 급여 조정, 계약자 추적, 추정세 및 사업주 분배 논의."], ["품질 우선 절차", "체계적인 요청, 실용적인 검토 메모, 명확한 설명으로 불확실성을 줄이는 것이 목표입니다."]]],
      "florida-tax-planning": ["플로리다 세무 계획", "세금 시즌이 모든 결정을 압축하기 전에 계획하십시오.", "세무 계획은 마감일 전에 추정세, 소득 시점, 은퇴 기여, 법인 문제, 기록을 검토하도록 돕습니다.", "", "", "", [["검토할 계획 주제", "효과적인 계획은 현재 연도 소득, 원천징수, 추정세, 사업 이익, 급여, 은퇴 계획, 공제, 주요 생활 또는 사업 변화에서 시작됩니다."], ["사업주", "깨끗한 장부는 사업주 보상, 분배, 계약자 처리, 추정세 논의를 더 유용하게 만듭니다."], ["개인과 가족", "투자 소득, 다주 이슈, 주식 보상, 임대 활동, 기부, 교육 공제, 추정세가 포함될 수 있습니다."]]],
      "bookkeeping-cleanup": ["장부 정리", "깨끗한 기록은 더 나은 세무 및 사업 대화를 만듭니다.", "지연 장부 정리와 cleanup은 불명확한 기록을 검토, 계획, 세금 신고에 더 적합한 보고서로 바꿀 수 있습니다.", "", "", "", [["필요할 수 있는 상황", "은행과 카드가 대사되지 않았거나, 사업주 이체와 대출이 불명확하거나, 개인과 사업 거래가 섞였거나, 보고서가 세무 기록 또는 은행 명세서와 맞지 않는 경우."], ["지원 가능한 부분", "깨끗한 기록은 세금 신고, 금융 신청, 현금흐름 검토, 추정세 계획, 더 나은 사업 결정을 지원합니다."], ["현재 상태", "VisionPoint는 향후 문서 교환과 회계 검토를 위한 보안 intake 절차를 준비 중입니다."]]]
    }
  }
};

function urlFor(lang, slug) {
  const base = languages[lang].base;
  return `${base}${slug ? `/${slug}/` : "/"}`;
}

function absoluteFor(lang, slug) {
  return `${site}${urlFor(lang, slug)}`;
}

function hreflang(slug, lang) {
  const canonical = absoluteFor(lang, slug);
  return `<link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="en" href="${absoluteFor("en", slug)}">
    <link rel="alternate" hreflang="es" href="${absoluteFor("es", slug)}">
    <link rel="alternate" hreflang="zh-Hans" href="${absoluteFor("zh", slug)}">
    <link rel="alternate" hreflang="ko" href="${absoluteFor("ko", slug)}">
    <link rel="alternate" hreflang="x-default" href="${absoluteFor("en", slug)}">`;
}

function header(lang, slug) {
  const l = languages[lang];
  const nav = navSlugs.map((s, i) => `<a href="${urlFor(lang, s)}">${l.nav[i]}</a>`).join("");
  const switcher = Object.entries(languages).map(([code, meta]) => `<a href="${urlFor(code, slug)}" lang="${meta.lang}">${meta.label}</a>`).join("");
  return `<header class="site-header" aria-label="Primary">
      <a class="brand" href="${urlFor(lang, "")}"><img class="brand-logo" src="/assets/visionpoint-logo-header.png" alt="" aria-hidden="true"><span>${brand}</span></a>
      <div class="header-tools"><nav class="nav" aria-label="Site navigation">${nav}</nav><nav class="language-switcher" aria-label="Language selector">${switcher}</nav></div>
    </header>`;
}

function footer(lang) {
  const l = languages[lang];
  return `<footer class="site-footer"><div><p>&copy; 2026 ${brand}.</p><p class="footer-note">${l.preview}</p></div><nav class="footer-links" aria-label="Footer links">${legalSlugs.map((s, i) => `<a href="${urlFor(lang, s)}">${l.footer[i]}</a>`).join("")}</nav></footer>`;
}

function cardGrid(items, klass = "directory-grid") {
  return `<div class="${klass}">${items.map((item) => item.length === 3
    ? `<article class="${klass === "directory-grid" ? "directory-card" : "post-card"}"><span>${item[0]}</span><strong>${item[1]}</strong><p>${item[2]}</p></article>`
    : `<article class="post-card"><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("")}</div>`;
}

function pageHtml(lang, slug) {
  const page = content[lang].pages[slug];
  const title = `${page[0]} | ${brand}`;
  const img = images[slug];
  const mainCards = page[6] || [];
  const visual = img && page[3] ? `<section class="visual-band"><figure class="service-visual"><img src="${img[0]}" alt="${img[1]}"></figure><div class="visual-copy"><p class="section-kicker">${page[3]}</p><h2>${page[4]}</h2><p>${page[5]}</p></div></section>` : "";
  const cards = slug === "services"
    ? `<section class="section">${cardGrid(mainCards, "directory-grid")}</section>`
    : `<section class="article-layout"><article class="article">${mainCards.map(([h, a, b]) => `<h2>${h}</h2><p>${a}</p>${b ? `<p>${b}</p>` : ""}`).join("")}</article><aside class="article-aside"><p class="tag">${page[0]}</p><h2>${lang === "es" ? "Explorar" : lang === "zh" ? "继续浏览" : "다음 보기"}</h2><a href="${urlFor(lang, "services")}">${languages[lang].nav[0]}</a><a href="${urlFor(lang, "tax-planning")}">${languages[lang].nav[1]}</a><a href="${urlFor(lang, "contact")}">${languages[lang].nav[6]}</a></aside></section>`;
  return `<!doctype html>
<html lang="${languages[lang].lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${page[2]}">
    ${hreflang(slug, lang)}
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body class="subpage">
    ${header(lang, slug)}
    <main>
      <section class="page-hero"><div class="page-hero-inner"><p class="article-meta">${page[0]}</p><h1>${page[1]}</h1><p>${page[2]}</p></div></section>
      ${visual}
      ${cards}
    </main>
    ${footer(lang)}
  </body>
</html>
`;
}

function homeHtml(lang) {
  const h = content[lang].home;
  return `<!doctype html>
<html lang="${languages[lang].lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${h.description}">
    ${hreflang("", lang)}
    <title>${h.title}</title>
    <link rel="preload" href="/assets/cpa-firm-hero.png" as="image">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    ${header(lang, "")}
    <main id="top">
      <section class="hero" aria-label="CPA firm introduction">
        <img src="/assets/cpa-firm-hero.png" alt="A modern accounting office with financial documents, laptop, and city light.">
        <div class="hero-shade"></div>
        <div class="hero-content">
          <p class="eyebrow">${h.eyebrow}</p>
          <div class="site-notice" role="status"><strong>${h.noticeTitle}</strong><span>${h.noticeText}</span></div>
          <h1 class="long-hero-title">${h.h1}</h1>
          <p>${h.intro}</p>
          <div class="hero-actions" aria-label="Featured links"><a class="button primary" href="${urlFor(lang, "contact")}">${h.cta1}</a><a class="button secondary" href="${urlFor(lang, "services")}">${h.cta2}</a></div>
        </div>
      </section>
      <section class="credential-strip" aria-label="Professional credentials">${h.sections.map((x) => `<div><span>${x[1]}</span><strong>${x[2]}</strong></div>`).join("")}</section>
      <section class="section">
        <div class="section-heading"><p class="section-kicker">VisionPoint CPA</p><h2>${h.cardsTitle}</h2></div>
        <div class="value-grid">${h.cards.map((x, i) => `<article class="value-card"><span>0${i + 1}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join("")}</div>
      </section>
      <section class="section">
        <div class="section-heading"><p class="section-kicker">${lang === "es" ? "Servicios" : lang === "zh" ? "核心服务" : "핵심 서비스"}</p><h2>${lang === "es" ? "Guía según la necesidad." : lang === "zh" ? "按需求提供指导。" : "필요에 맞춘 안내."}</h2></div>
        <div class="topic-grid">${["tax-planning", "services", "small-business-cpa", "florida-cpa"].map((s) => `<a class="topic-card" href="${urlFor(lang, s)}"><span>${content[lang].pages[s][0]}</span><strong>${content[lang].pages[s][1]}</strong></a>`).join("")}</div>
      </section>
      <section class="portal-band"><div><p class="section-kicker">Client Portal</p><h2>${lang === "es" ? "Intercambio seguro de archivos próximamente." : lang === "zh" ? "安全文件交换即将上线。" : "보안 파일 교환 준비 중."}</h2><p>${lang === "es" ? "Se está preparando un portal para carga de documentos, listas de intake y comunicación segura." : lang === "zh" ? "计划中的客户门户将用于文件上传、资料清单、税务 organizer 和安全沟通。" : "문서 업로드, intake 체크리스트, 세무 organizer 및 보안 커뮤니케이션을 위한 고객 포털을 준비 중입니다."}</p></div><a class="button secondary dark-button" href="${urlFor(lang, "resources")}">${languages[lang].nav[3]}</a></section>
    </main>
    ${footer(lang)}
  </body>
</html>
`;
}

function writeLocalized() {
  for (const lang of ["es", "zh", "ko"]) {
    fs.mkdirSync(path.join(root, lang), { recursive: true });
    fs.writeFileSync(path.join(root, lang, "index.html"), homeHtml(lang));
    for (const slug of slugs.filter(Boolean)) {
      const dir = path.join(root, lang, slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), pageHtml(lang, slug));
    }
  }
}

function updateEnglish() {
  for (const slug of slugs) {
    const file = path.join(root, slug ? slug : "", "index.html");
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, "utf8");
    html = html.replace(/<link rel="canonical"[\s\S]*?(?=\s*<title>)/, hreflang(slug, "en") + "\n    ");
    html = html.replace(/<header class="site-header"[\s\S]*?<\/header>/, header("en", slug));
    html = html.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/, footer("en"));
    if (slug === "") {
      html = html.replace("A reserved Chinese section is included so the firm can publish Mandarin-friendly pages next.", "Dedicated Spanish, Chinese, and Korean sections are included so the firm can publish multilingual client education as the launch develops.");
    }
    fs.writeFileSync(file, html);
  }
}

function updateSitemap() {
  const urls = [];
  for (const slug of slugs) {
    for (const lang of ["en", "es", "zh", "ko"]) urls.push(absoluteFor(lang, slug));
  }
  const body = urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n");
  fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

writeLocalized();
updateEnglish();
updateSitemap();
