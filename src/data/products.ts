export interface ProductItem {
  id: string;
  name: string;
  categorySlug: string;
  subtitle: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  applications: string[];
  certifications: string[];
  badge?: string;
  inStock: boolean;
}

export interface ProductCategory {
  slug: string;
  title: string;
  shortTitle: string;
  headline: string;
  description: string;
  overview: string;
  iconName: string;
  itemCount: number;
  tags: string[];
  products: ProductItem[];
}

export const productCategories: ProductCategory[] = [
  {
    slug: "medical-equipment",
    title: "Medical Equipment & Devices",
    shortTitle: "Medical Equipment",
    headline: "High-precision clinical & critical care apparatus engineered for modern healthcare",
    description:
      "From high-vacuum electric suction units and manual paddle suction units to vital patient monitors and precision infusion systems, Cure Express supplies hospitals and surgical clinics with reliable, performance-tested medical equipment.",
    overview:
      "Our medical equipment division focuses on delivering precision-engineered, hospital-grade apparatus designed for high dependability in emergency rooms, operating theaters, intensive care units, and outpatient clinics. Compliant with ISO 13485 benchmarks, each device undergo rigorous electrical, mechanical, and operational calibration before dispatch.",
    iconName: "Stethoscope",
    itemCount: 6,
    tags: ["Critical Care", "OR Equipment", "Suction Units", "Monitors"],
    products: [
      {
        id: "electric-suction-machine-heavy-duty",
        name: "Electric Suction Apparatus (High Vacuum / High Flow)",
        categorySlug: "medical-equipment",
        subtitle: "Dual-jar continuous duty surgical suction machine",
        description:
          "Engineered for high vacuum and high flow surgical and clinical aspiration. Features oil-free diaphragm pump, anti-overflow safety mechanism, and durable powder-coated steel chassis.",
        features: [
          "Oil-free maintenance-free piston pump",
          "Dual autoclavable polycarbonate jars (2.5L each)",
          "Overflow protection valve with bacterial air filter",
          "Smooth stepless vacuum regulator knob with precision gauge",
          "Quiet operation under 50 dB with heavy-duty castor wheels",
        ],
        specs: {
          "Max Vacuum": "-0.09 MPa (-680 mmHg)",
          "Pumping Flow Rate": "≥ 40 Litres/min",
          "Jar Capacity": "2 x 2500 ml (Polycarbonate)",
          "Power Input": "AC 220V ± 10%, 50Hz",
          "Noise Level": "≤ 50 dB(A)",
          "Chassis": "Epoxy powder-coated metal with ergonomic push handle",
        },
        applications: ["Operating Theatres", "Intensive Care Units (ICU)", "Emergency Rooms", "Surgical Centers"],
        certifications: ["ISO 13485:2016", "CE Mark", "IEC 60601-1"],
        badge: "Flagship Device",
        inStock: true,
      },
      {
        id: "manual-pedal-suction-unit",
        name: "Manual Foot / Pedal Suction Machine",
        categorySlug: "medical-equipment",
        subtitle: "Emergency non-electric foot-operated aspiration unit",
        description:
          "Compact, non-electric emergency suction machine designed for rapid response, field clinics, and power-outage situations. Delivers powerful vacuum with minimal physical effort.",
        features: [
          "Operates completely independent of electricity",
          "Durable foot pedal spring mechanism",
          "Single 1000ml autoclavable collection jar",
          "Instant suction generation with anti-reflux valve",
          "Lightweight portable frame easy to transport in ambulances",
        ],
        specs: {
          "Max Vacuum": "≥ 0.04 MPa (300 mmHg)",
          "Jar Capacity": "1000 ml autoclavable bottle",
          "Weight": "4.5 kg lightweight portable",
          "Mechanism": "Foot pedal piston suction",
        },
        applications: ["Ambulance Services", "Rural Medical Centers", "Disaster Relief", "Bedside Backup"],
        certifications: ["ISO 9001:2015", "CE Compliant"],
        badge: "Essential Emergency",
        inStock: true,
      },
      {
        id: "icu-multiparameter-patient-monitor",
        name: "Multi-Parameter Patient Monitor (12.1-inch Screen)",
        categorySlug: "medical-equipment",
        subtitle: "Real-time vital signs monitoring for ICU, OT, and PACU",
        description:
          "Comprehensive clinical monitor tracking ECG (3/5 lead), SpO2, NIBP, Respiration, PR, and dual-channel temperature. Features high-resolution color TFT display and multi-level audio/visual alarm system.",
        features: [
          "12.1-inch anti-glare color TFT screen with multi-lead display",
          "Arrhythmia and ST segment analysis",
          "Drug dose calculation and titration table",
          "Built-in rechargeable Li-ion battery (up to 4 hours runtime)",
          "Central monitoring system (CMS) networking capability",
        ],
        specs: {
          "Display": "12.1-inch color TFT (800 x 600 resolution)",
          "Parameters": "ECG, SpO2, NIBP, RESP, 2-TEMP, PR (Optional EtCO2, 2-IBP)",
          "Battery Life": "Standard 4 hours continuous monitoring",
          "Data Storage": "120 hours trend review, 1000 NIBP recall",
        },
        applications: ["ICU & CCU", "Recovery Rooms", "General Inpatient Wards", "Anesthesia Monitoring"],
        certifications: ["ISO 13485:2016", "CE Mark", "IEC 60601-1-2"],
        badge: "High Precision",
        inStock: true,
      },
      {
        id: "clinical-infusion-pump-smart",
        name: "Programmable Syringe & Infusion Pump",
        categorySlug: "medical-equipment",
        subtitle: "Microprocessor-controlled intravenous infusion precision system",
        description:
          "High-accuracy volumetric infusion pump supporting universal IV sets with automated bolus delivery, occlusion pressure sensing, and multiple infusion modes.",
        features: [
          "Infusion accuracy within ±5%",
          "Anti-free-flow protection clamp",
          "Audio-visual alarms for air-in-line, occlusion, empty bottle, door open",
          "KVO (Keep Vein Open) rate automation",
        ],
        specs: {
          "Flow Rate Range": "0.1 ml/h to 1200 ml/h (0.1 ml/h increments)",
          "Infusion Accuracy": "±5% with calibrated IV sets",
          "Occlusion Levels": "3 programmable sensitivity levels (Low, Medium, High)",
          "Alarms": "Air bubble, occlusion, battery low, door open, complete",
        },
        applications: ["Chemotherapy Delivery", "Pediatric Infusion", "Anesthesia Delivery", "ICU Intensive Care"],
        certifications: ["ISO 13485:2016", "CE Mark"],
        badge: "Microprocessor Controlled",
        inStock: true,
      },
      {
        id: "digital-autoclave-sterilizer",
        name: "Digital Steam Autoclave & Sterilizer",
        categorySlug: "medical-equipment",
        subtitle: "Class B vacuum steam sterilizer for surgical instruments",
        description:
          "High-pressure saturated steam sterilizer engineered for surgical instruments, dressings, glassware, and hollow instruments. Features micro-computer cycle control with digital temperature and pressure indicators.",
        features: [
          "Triple fractionated pre-vacuum and post-drying cycles",
          "Medical grade 304 stainless steel sterilization chamber",
          "Safety interlock door mechanism prevents opening under pressure",
          "Integrated thermal printer for validation logs",
        ],
        specs: {
          "Chamber Volume": "24 Litres (Stainless Steel 304)",
          "Sterilization Temp": "121°C and 134°C cycles",
          "Sterilization Pressure": "0.12 MPa – 0.23 MPa",
          "Power Consumption": "1800W, 220V/50Hz",
        },
        applications: ["Dental Clinics", "Surgical Centers", "Ophthalmology Suites", "Hospital CSSD"],
        certifications: ["ISO 13485:2016", "EN 13060", "CE Certified"],
        badge: "CSSD Standard",
        inStock: true,
      },
      {
        id: "biphasic-defibrillator-monitor",
        name: "Biphasic Defibrillator & External Monitor",
        categorySlug: "medical-equipment",
        subtitle: "Manual, AED, and Pacing emergency resuscitation system",
        description:
          "Lifesaving biphasic truncated exponential defibrillator offering energy delivery from 1J to 360J, synchronized cardioversion, non-invasive pacing, and ECG monitoring.",
        features: [
          "Biphasic waveform technology reduces myocardium damage",
          "Fast charging: under 5 seconds to 200 Joules",
          "AED mode with voice and text CPR feedback prompts",
          "Integrated 3-channel thermal recorder",
        ],
        specs: {
          "Energy Selection": "1, 2, 3, 5, 7, 10, 20, 30, 50, 100, 150, 200, 300, 360 Joules",
          "Charging Time": "< 5 sec to 200J, < 8 sec to 360J",
          "Display": "7-inch high resolution color TFT",
          "Pacing Modes": "Demand and Fixed external non-invasive pacing",
        },
        applications: ["Emergency Wards", "Cardiac Care Units (CCU)", "Ambulance Fleets", "Operating Rooms"],
        certifications: ["ISO 13485:2016", "CE Mark"],
        badge: "Critical Life Support",
        inStock: true,
      },
    ],
  },
  {
    slug: "hospital-furniture",
    title: "Hospital Furniture & Patient Care Support",
    shortTitle: "Hospital Furniture",
    headline: "Ergonomic, hygienic, and heavy-duty clinical furniture engineered for patient comfort",
    description:
      "Cure Express manufactures motorized ICU beds, manual fowler ward beds, stainless steel instrument trolleys, bedside lockers, and pediatric cots designed with antimicrobial coatings and durable mechanical components.",
    overview:
      "Hospital environments demand patient furniture that balances supreme patient comfort with absolute infection control and operational efficiency for nursing teams. Our furniture range is built from robotically welded high-grade tubular steel, coated with anti-bacterial electrostatic powder finishes, and equipped with smooth-gliding anti-static castors.",
    iconName: "Bed",
    itemCount: 6,
    tags: ["ICU Beds", "Ward Furniture", "Crash Carts", "Trolleys"],
    products: [
      {
        id: "motorized-5-function-icu-bed",
        name: "Electric 5-Function ICU Hospital Bed",
        categorySlug: "hospital-furniture",
        subtitle: "Advanced motorized intensive care bed with CPR and nurse controls",
        description:
          "Premium electric hospital bed with remote handheld control and integrated nurse control panel. Features backrest, knee-rest, Trendelenburg, reverse Trendelenburg, and height adjustment powered by silent linear actuators.",
        features: [
          "4 heavy-duty medical grade electric linear actuators",
          "Integrated ABS fold-down side rails with angle indicators",
          "Quick-release manual CPR lever for emergency cardiac arrest recovery",
          "Central locking castor wheel braking system (125mm castors)",
          "Detachable ABS head and foot boards for easy sanitization",
        ],
        specs: {
          "Overall Dimensions": "2180 mm (L) x 1020 mm (W) x 480-780 mm (H)",
          "Backrest Angle": "0° to 75°",
          "Knee-rest Angle": "0° to 45°",
          "Trendelenburg / Reverse": "0° to 12°",
          "Safe Working Load": "250 kg (550 lbs)",
          "Actuators": "Linak / Timotion medical grade waterproof actuators",
        },
        applications: ["ICU / CCU", "Post-Operative Recovery", "Cardiology Wards", "VIP Suites"],
        certifications: ["ISO 13485:2016", "IEC 60601-2-52", "CE Mark"],
        badge: "Hospital Flagship",
        inStock: true,
      },
      {
        id: "manual-fowler-hospital-bed",
        name: "Full Fowler Two-Function Hospital Ward Bed",
        categorySlug: "hospital-furniture",
        subtitle: "Durable crank-operated patient bed for general wards",
        description:
          "Heavy-duty hospital bed with dual folding crank handles to adjust backrest and knee rest independently. Coated with anti-microbial epoxy powder finish to withstand harsh hospital disinfectants.",
        features: [
          "Smooth lead-screw folding crank mechanism with limit stops",
          "Collapsible aluminum alloy side protective safety rails",
          "Perforated CRCA sheet top with uniform ventilation holes",
          "Four diagonal swivel castors with independent brakes",
          "Four locations for IV pole mounting with rubber bumpers",
        ],
        specs: {
          "Dimensions": "2080 mm (L) x 960 mm (W) x 550 mm (H)",
          "Backrest Elevation": "0° to 70° (via smooth crank)",
          "Knee Rest Elevation": "0° to 35° (via smooth crank)",
          "Frame": "CRCA rectangular steel pipe with 80-micron epoxy powder coating",
          "Load Capacity": "180 kg",
        },
        applications: ["General Medical Wards", "Nursing Homes", "Recovery Clinics", "Institutional Hospitals"],
        certifications: ["ISO 9001:2015", "CE Compliant"],
        badge: "High Durability",
        inStock: true,
      },
      {
        id: "abs-emergency-crash-cart",
        name: "ABS Emergency Resuscitation Crash Cart",
        categorySlug: "hospital-furniture",
        subtitle: "Mobile emergency medication and resuscitation organizer trolley",
        description:
          "Engineered for high-stress code blue situations. Features lightweight aluminum alloy columns, modular ABS drawers with centralized key lock, defibrillator shelf, cardiac CPR backboard, and oxygen cylinder holder.",
        features: [
          "One-piece ABS molded top plate with raised edges to prevent spillage",
          "Five color-coded compartmentalized drawers with internal dividers",
          "Centralized safety breakaway seal lock system",
          "Includes 360° rotating defibrillator tray and stainless steel IV pole",
          "Side pull-out writing shelf for chart updates during resuscitation",
        ],
        specs: {
          "Dimensions": "850 mm (W) x 520 mm (D) x 950 mm (H)",
          "Castors": "4 x 100mm noise-free castors (2 with brakes)",
          "Accessories": "Oxygen tank bracket, CPR board, sharps container, power strip",
          "Drawer Configuration": "2 small, 2 medium, 1 large drawer with customized dividers",
        },
        applications: ["Emergency Departments", "ICU Code Blue Units", "Operating Rooms", "Trauma Centers"],
        certifications: ["ISO 9001:2015", "ISO 13485:2016"],
        badge: "Critical Response",
        inStock: true,
      },
      {
        id: "stainless-steel-dressing-trolley",
        name: "Stainless Steel Instrument & Dressing Trolley",
        categorySlug: "hospital-furniture",
        subtitle: "Corrosion-resistant grade 304 stainless steel hospital cart",
        description:
          "Double shelf stainless steel medical utility trolley with three-sided protective guard rails on both tiers. Built specifically for cleanroom, surgical scrub, and wound dressing rounds.",
        features: [
          "Seamless argon-welded 304-grade stainless steel construction",
          "Three-side perimeter safety guardrails prevent instrument slippage",
          "Smooth noise-free anti-static swivel wheels",
          "Includes waste bin bowl and stainless steel wash basin holder",
        ],
        specs: {
          "Material": "SS 304 Grade Stainless Steel (anti-rust mirror finish)",
          "Dimensions": "750 mm (L) x 450 mm (W) x 850 mm (H)",
          "Shelves": "Two tiers with 3-sided protective railings",
          "Castors": "4 x 75mm medical grade swivel castors",
        },
        applications: ["OT Sterile Corridor", "Minor Surgery Clinics", "Inpatient Dressing Rounds", "Diagnostic Labs"],
        certifications: ["ISO 9001:2015"],
        badge: "Grade 304 SS",
        inStock: true,
      },
      {
        id: "neonatal-pediatric-baby-cot",
        name: "Neonatal Pediatric Baby Bassinet / Cot",
        categorySlug: "hospital-furniture",
        subtitle: "Transparent acrylic tilting bassinet for newborn nurseries",
        description:
          "Safe and ergonomic newborn cot featuring a transparent acrylic crib with adjustable Trendelenburg tilt for infant reflux management. Mounted on an epoxy powder-coated tubular steel stand with a bottom storage basket.",
        features: [
          "Clear optical-grade acrylic bassinet with smooth rounded edges",
          "Stepless angle tilt adjustment (0° to 12°) for reflux prevention",
          "Durable waterproof infant mattress with breathable cover",
          "Bottom wire mesh utility basket for infant diapers and clothing",
        ],
        specs: {
          "Crib Dimensions": "800 mm (L) x 450 mm (W) x 250 mm (D)",
          "Stand Height": "850 mm optimal nursing height",
          "Tilt Angle": "0° to 12° forward/reverse",
          "Castors": "4 x 50mm smooth castors with wheel locks",
        },
        applications: ["Maternity Wards", "NICU Step-down", "Obstetrics Clinics", "Pediatric Units"],
        certifications: ["ISO 13485:2016", "CE Mark"],
        badge: "Maternity Standard",
        inStock: true,
      },
      {
        id: "hydraulic-patient-transfer-stretcher",
        name: "Hydraulic Patient Transfer Trolley / Stretcher",
        categorySlug: "hospital-furniture",
        subtitle: "Heavy-duty emergency transport stretcher with central steering",
        description:
          "High-agility emergency stretcher featuring dual hydraulic pedals for rapid elevation, Trendelenburg, and reverse Trendelenburg adjustments. Equipped with 5th wheel steering mechanism for effortless corner navigation in hospital corridors.",
        features: [
          "Dual hydraulic foot pumps accessible from both sides",
          "Retractable fifth steering wheel for precise corridor maneuvering",
          "Full-length collapsible protective safety side rails",
          "Integrated X-ray translucent backrest for trauma evaluation",
        ],
        specs: {
          "Dimensions": "1950 mm (L) x 650 mm (W) x 580-880 mm (H)",
          "Weight Capacity": "220 kg dynamic load",
          "Backrest Lift": "0° to 80° gas-spring supported",
          "Central Braking": "Step-on central locking brake pedal",
        },
        applications: ["Trauma Transport", "Emergency Ward Intake", "Operating Room Transfer", "Ambulance Receiving"],
        certifications: ["ISO 13485:2016", "CE Mark"],
        badge: "Rapid Transport",
        inStock: true,
      },
    ],
  },
  {
    slug: "surgical-equipment",
    title: "Surgical Equipment & Precision Instruments",
    shortTitle: "Surgical Equipment",
    headline: "OR-grade surgical tools and precision electrocautery instruments",
    description:
      "Cure Express manufactures and distributes surgical equipment supporting operating theaters across specialties including general surgery, orthopedics, laparoscopy, cardiology, and neurosurgery.",
    overview:
      "Precision, balance, and metallurgical integrity define our surgical division. All instruments are crafted from premium forged stainless steel (AISI 410 / 420 / 316) and undergo ultrasonic cleaning, passivating, and precision hand-finishing to ensure micro-edge sharpness, corrosion resistance, and tactile comfort for operating surgeons.",
    iconName: "Scissors",
    itemCount: 6,
    tags: ["Operating Room", "Laparoscopy", "Electrosurgery", "Instruments"],
    products: [
      {
        id: "high-frequency-electrosurgical-unit",
        name: "High Frequency Electrosurgical Cautery Unit (400W)",
        categorySlug: "surgical-equipment",
        subtitle: "Monopolar & Bipolar microprocessor electrosurgery generator",
        description:
          "Advanced 400W electrosurgical generator designed for all open and endoscopic surgical procedures. Features real-time contact quality monitoring (REM) and auto-compensation for varying tissue impedances.",
        features: [
          "Pure cut, blend 1, blend 2, and fulguration coagulation modes",
          "Precise micro-bipolar mode for neurosurgery and microsurgery",
          "Return electrode monitoring system (REM) prevents patient burns",
          "Dual foot pedal and finger switch pencil activations",
        ],
        specs: {
          "Max Power": "400W at 300Ω (Monopolar Pure Cut)",
          "Coagulation Power": "120W (Contact & Spray)",
          "Bipolar Output": "80W at 100Ω",
          "Operating Frequency": "512 kHz sinusoidal",
        },
        applications: ["General Surgery", "Orthopedics", "Gynecology", "Urology & Endoscopy", "Neurosurgery"],
        certifications: ["ISO 13485:2016", "IEC 60601-2-2", "CE Mark"],
        badge: "Advanced Generator",
        inStock: true,
      },
      {
        id: "general-laparoscopic-instrument-set",
        name: "Laparoscopic Minimally Invasive Surgery Instrument Set",
        categorySlug: "surgical-equipment",
        subtitle: "Complete 10mm & 5mm laparoscopic procedural instruments",
        description:
          "Complete set of insulated laparoscopic instruments featuring Maryland dissectors, curved scissors, atraumatic graspers, clip appliers, and trocar cannulas made with medical titanium-steel composite.",
        features: [
          "Double-layer high-dielectric electrical insulation coating",
          "360-degree finger rotation wheel for accurate tip orientation",
          "Detachable 3-piece modular design for thorough sterilization",
          "Ergonomic ratchet handle with instant disengagement switch",
        ],
        specs: {
          "Shaft Diameter": "5 mm and 10 mm standard sizes",
          "Working Length": "330 mm and 450 mm bariatric lengths",
          "Material": "Medical grade stainless steel with PEEK insulation",
          "Autoclavable": "134°C steam sterilizable up to 500 cycles",
        },
        applications: ["Cholecystectomy", "Appendectomy", "Hernia Repair", "Gynecological Laparoscopy"],
        certifications: ["ISO 13485:2016", "CE Mark"],
        badge: "Precision Laparoscopy",
        inStock: true,
      },
      {
        id: "orthopedic-major-bone-instrument-tray",
        name: "Orthopedic Major Bone Surgery Instrument Tray",
        categorySlug: "surgical-equipment",
        subtitle: "Heavy-duty bone holding forceps, retractor sets, and chisels",
        description:
          "Specialized orthopedic surgical kit containing Lowman bone clamps, Hohmann retractors, Lambotte osteotomes, bone files, and orthopedic mallet forged from tempered stainless steel.",
        features: [
          "Satin non-glare finish reduces glare under powerful OT surgical lighting",
          "Hardened cutting edges retain sharpness through demanding bone work",
          "Sterilization container with silicone holding racks included",
        ],
        specs: {
          "Pieces per Set": "48 instruments + perforated sterilization basket",
          "Steel Grade": "AISI 420 Martensitic surgical stainless steel",
          "Surface Treatment": "Passivated & electropolished matte finish",
        },
        applications: ["Fracture Fixation", "Joint Replacement", "Trauma Orthopedics", "Spinal Reconstruction"],
        certifications: ["ISO 13485:2016", "CE Compliant"],
        badge: "Trauma Grade",
        inStock: true,
      },
      {
        id: "titanium-micro-neurosurgical-forceps",
        name: "Titanium Non-Stick Bipolar & Micro Forceps Set",
        categorySlug: "surgical-equipment",
        subtitle: "Ultra-fine tip micro-instruments for neuro and vascular surgery",
        description:
          "Lightweight titanium micro forceps with non-stick silver alloy tips preventing tissue adherence and coagulation buildup during delicate neurosurgical procedures.",
        features: [
          "High thermal conductivity silver alloy tips prevent tissue sticking",
          "Ultra-lightweight titanium body reduces surgeon hand fatigue",
          "Precision guide pins ensure absolute tip alignment under microscope",
        ],
        specs: {
          "Tip Sizes": "0.3 mm, 0.5 mm, 1.0 mm, 1.5 mm",
          "Lengths": "160 mm, 190 mm, 220 mm bayonet and straight shapes",
          "Connector": "Universal 2-pin European standard plug",
        },
        applications: ["Neurosurgery", "Micro-Vascular Anastomosis", "Plastic Surgery", "ENT Surgery"],
        certifications: ["ISO 13485:2016", "CE Mark"],
        badge: "Ultra-Micro Precision",
        inStock: true,
      },
      {
        id: "carbon-steel-surgical-blades",
        name: "Sterile Carbon Steel Surgical Blades & Scalpel Handles",
        categorySlug: "surgical-equipment",
        subtitle: "Individually foil-wrapped gamma-irradiated surgical blades",
        description:
          "Razor-sharp surgical blades manufactured from high-carbon Swiss steel. Gamma irradiated to ensure sterility. Available in all standard surgical sizes (No. 10, 11, 12, 15, 20, 21, 22, 23, 24).",
        features: [
          "Precision computer-ground razor edge for effortless tissue incisions",
          "Hermetically sealed peel-open aluminum foil packs with VCI anti-rust liner",
          "Supplied with standard No. 3 and No. 4 stainless steel scalpel handles",
        ],
        specs: {
          "Blade Sizes": "No. 10, 11, 12, 15 (Handle #3); No. 20, 21, 22, 23, 24 (Handle #4)",
          "Packaging": "100 blades per box, 50 boxes per master carton",
          "Sterilization": "Gamma radiation (25 kGy minimum dose)",
        },
        applications: ["General Surgery", "Dermatology", "Plastic Surgery", "Autopsy & Pathology"],
        certifications: ["ISO 13485:2016", "CE 0197"],
        badge: "Ultra Sharp",
        inStock: true,
      },
      {
        id: "led-surgical-operating-light",
        name: "Ceiling-Mounted Shadowless LED Surgical Light",
        categorySlug: "surgical-equipment",
        subtitle: "High CRI cold light surgical luminaire with multi-lens array",
        description:
          "Dual-dome ceiling-mounted surgical lighting system delivering high-intensity daylight illumination up to 160,000 Lux without emitting infrared thermal radiation to the operative field.",
        features: [
          "Color temperature adjustable between 3800K and 5000K",
          "High Color Rendering Index (CRI Ra ≥ 97) for accurate tissue differentiation",
          "Integrated endoscopic illumination mode for keyhole surgery",
          "Detachable sterilizable handle for surgeon positioning control",
        ],
        specs: {
          "Illuminance": "160,000 Lux (Major Dome) + 120,000 Lux (Satellite Dome)",
          "Field Diameter": "160 mm to 300 mm adjustable focus",
          "LED Lifespan": "≥ 60,000 operational hours",
          "Power Consumption": "120W per dome",
        },
        applications: ["Major Surgery Suites", "Cardiac Theaters", "Transplant Operating Rooms"],
        certifications: ["ISO 13485:2016", "CE Mark"],
        badge: "Shadowless Tech",
        inStock: true,
      },
    ],
  },
  {
    slug: "diagnostics",
    title: "Clinical Diagnostics & Patient Assessment",
    shortTitle: "Diagnostics",
    headline: "Accurate clinical diagnostic instruments for early detection and assessment",
    description:
      "Cure Express offers foundational clinical diagnostic instruments including cardiology stethoscopes, aneroid sphygmomanometers, fingertip pulse oximeters, digital thermometers, and point-of-care rapid test kits.",
    overview:
      "Accurate early diagnosis forms the cornerstone of effective clinical care. Our diagnostic instruments are calibrated against international mercury and piezoelectric standards, ensuring dependable systolic/diastolic readings, auscultation clarity, and oxygen saturation accuracy across routine and critical triage assessments.",
    iconName: "Activity",
    itemCount: 6,
    tags: ["Blood Pressure", "Stethoscopes", "Oximeters", "Clinical Testing"],
    products: [
      {
        id: "desk-wall-aneroid-sphygmomanometer",
        name: "Desk & Wall-Mounted Aneroid Sphygmomanometer",
        categorySlug: "diagnostics",
        subtitle: "Square dial 145mm non-mercury precision blood pressure meter",
        description:
          "Large face clinical aneroid blood pressure gauge designed for hospital walls or mobile stands. Features a certified manometer mechanism resistant to mechanical shock and pressure surges.",
        features: [
          "Large 145mm high-contrast luminescent dial for effortless distance reading",
          "Latex-free adult nylon cuff with calibrated range markings",
          "Coiled expandable medical tubing (extends up to 3 meters)",
          "Integrated cuff storage basket behind the manometer dial",
        ],
        specs: {
          "Measurement Range": "0 to 300 mmHg",
          "Accuracy": "±3 mmHg across entire scale",
          "Dial Diameter": "145 mm round dial with clear bold graduations",
          "Mounting": "Dual capability: wall mounting swivel bracket or desk base",
        },
        applications: ["Hospital Ward Triage", "OPD Consulting Rooms", "ICU Step-down", "Specialty Clinics"],
        certifications: ["ISO 9001:2015", "ISO 13485:2016", "CE Mark"],
        badge: "Clinical Standard",
        inStock: true,
      },
      {
        id: "dual-head-cardiology-stethoscope",
        name: "Precision Dual-Head Cardiology Stethoscope",
        categorySlug: "diagnostics",
        subtitle: "Acoustic stainless steel stethoscope with tunable diaphragm",
        description:
          "Handcrafted dual-head stainless steel chestpiece stethoscope designed for adult and pediatric cardiac auscultation. Delivers exceptional acoustic sensitivity for faint murmurs and pulmonary sounds.",
        features: [
          "Solid CNC-machined surgical stainless steel chestpiece",
          "Tunable floating diaphragm responds to pressure variations for high/low frequencies",
          "Dual-lumen tubing combines two sound paths in one tube to eliminate rubbing noise",
          "Soft-sealing anatomically angled silicone ear tips for comfortable acoustic seal",
        ],
        specs: {
          "Chestpiece": "Precision machined stainless steel (Weight: 185g)",
          "Diaphragm Diameter": "45 mm (Adult) / 33 mm (Pediatric)",
          "Tubing Length": "71 cm (28 inches) thick-walled acoustic PVC",
          "Ear Tips": "Includes 2 pairs of spare soft silicone tips",
        },
        applications: ["Cardiology", "Pulmonology", "Internal Medicine", "Intensive Care"],
        certifications: ["ISO 9001:2015", "CE Compliant"],
        badge: "High Acoustic Gain",
        inStock: true,
      },
      {
        id: "fingertip-digital-pulse-oximeter",
        name: "Fingertip Digital Pulse Oximeter (OLED Display)",
        categorySlug: "diagnostics",
        subtitle: "SpO2 and pulse rate screening with perfusion index (PI%) display",
        description:
          "Accurate, rapid-response medical pulse oximeter with multi-directional color OLED screen. Features plethysmogram waveform display and visual alerts for abnormal oxygen saturation readings.",
        features: [
          "Dual-color OLED display with 6 display layout modes",
          "Simultaneous SpO2, PR, Plethysmogram, and Perfusion Index (PI%) tracking",
          "Anti-motion algorithm maintains accuracy during minor patient movement",
          "Automatic shut-off after 8 seconds of finger removal to preserve battery",
        ],
        specs: {
          "SpO2 Range": "70% – 100% (Accuracy: ±2% in 70-100% range)",
          "Pulse Rate Range": "30 – 250 bpm (Accuracy: ±2 bpm)",
          "Perfusion Index": "0.2% – 20.0%",
          "Battery Life": "Up to 30 continuous hours on 2 x AAA alkaline batteries",
        },
        applications: ["Emergency Triage", "Respiratory Clinics", "Home Healthcare", "Surgical Recovery"],
        certifications: ["ISO 13485:2016", "CE Mark", "FDA 510(k) cleared standard"],
        badge: "Instant SpO2",
        inStock: true,
      },
      {
        id: "infrared-clinical-forehead-thermometer",
        name: "Non-Contact Infrared Clinical Thermometer",
        categorySlug: "diagnostics",
        subtitle: "1-second hygienic fever screening without physical contact",
        description:
          "Medical infrared sensor thermometer providing accurate body temperature measurements from a distance of 1 to 5 cm. Features color-coded fever alarm and memory recall for 32 previous readings.",
        features: [
          "Zero contact eliminates cross-infection risks between patients",
          "Ultra-fast 1-second temperature capture with German infrared sensor",
          "Tri-color backlight LCD screen (Green: Normal, Yellow: Low Fever, Red: High Fever)",
          "Dual measurement modes: Human body temperature and surface liquid temperature",
        ],
        specs: {
          "Body Range": "32.0°C – 42.9°C (89.6°F – 109.2°F)",
          "Accuracy": "±0.2°C (within 35.0°C – 42.0°C)",
          "Measuring Distance": "1 cm – 5 cm from center of forehead",
          "Memory": "32 readings automatic storage",
        },
        applications: ["Hospital Gate Screening", "Pediatric Clinics", "Inpatient Rounds", "Corporate Clinics"],
        certifications: ["ISO 13485:2016", "CE Mark"],
        badge: "1-Sec Capture",
        inStock: true,
      },
      {
        id: "pocket-diagnostic-otoscope-ophthalmoscope",
        name: "Diagnostic Otoscope & Ophthalmoscope Set",
        categorySlug: "diagnostics",
        subtitle: "Fiber-optic LED illuminated ENT diagnostic examination kit",
        description:
          "Compact fiber-optic diagnostic set for comprehensive ear canal and fundus examinations. Equipped with distortion-free 3x magnifying swivel lens and multi-aperture ophthalmoscope head.",
        features: [
          "Fiber-optic cool LED illumination ensures unobstructed view of tympanic membrane",
          "Ophthalmoscope head with 18 focusing lenses (-20 to +20 diopters)",
          "Pneumatic testing port for tympanic mobility assessment",
          "Includes 8 reusable specula tips (2.5mm and 4mm)",
        ],
        specs: {
          "Illumination": "3.0V Warm White LED (≥ 20,000 hours service life)",
          "Magnification": "3x optical glass lens (scratch resistant)",
          "Power Source": "2 x AA batteries in knurled metal handle",
          "Case": "Durable hard-shell carrying case with molded foam inserts",
        },
        applications: ["ENT Outpatient", "Pediatric Clinics", "General Family Practice", "Emergency Rooms"],
        certifications: ["ISO 9001:2015", "CE Compliant"],
        badge: "Fiber-Optic Clarity",
        inStock: true,
      },
      {
        id: "clinical-blood-glucose-monitoring-system",
        name: "Hospital Point-of-Care Blood Glucose Monitoring System",
        categorySlug: "diagnostics",
        subtitle: "Electrochemical biosensor with 5-second rapid test result",
        description:
          "Professional glucose monitoring system requiring only a 0.5 µL capillary blood drop. Delivers plasma-calibrated readings with zero coding required.",
        features: [
          "No coding technology eliminates calibration errors",
          "Minimal 0.5 microlitre blood sample volume",
          "Automatic strip ejection avoids contact with tested blood",
          "500-test memory with 7, 14, and 30-day glycemic averages",
        ],
        specs: {
          "Test Range": "20 – 600 mg/dL (1.1 – 33.3 mmol/L)",
          "Test Time": "5 seconds",
          "Sample Type": "Fresh capillary or venous whole blood",
          "Hematocrit Range": "20% – 60%",
        },
        applications: ["Endocrinology Wards", "Diabetic Clinics", "ICU Glycemic Control", "Home Monitoring"],
        certifications: ["ISO 15197:2013", "ISO 13485:2016", "CE Mark"],
        badge: "Zero Coding",
        inStock: true,
      },
    ],
  },
  {
    slug: "hospital-dressing",
    title: "Hospital Dressings & Wound Care",
    shortTitle: "Hospital Dressing",
    headline: "Sterile wound dressings, medical gauze, bandages, and adhesive fixators",
    description:
      "Cure Express manufactures sterile gauze swabs, absorbent cotton rolls, zinc oxide adhesive plasters, IV cannula fixators, and paraffin tulle gras dressings conforming to British Pharmacopoeia (B.P.) standards.",
    overview:
      "Effective wound healing depends on sterile, non-toxic, and highly absorbent dressing consumables. Our dressings are manufactured in purified cleanroom environments using 100% bleached pure cotton fibers free from chemical optical brighteners. They deliver supreme fluid absorption, painless dressing changes, and dependable skin fixation.",
    iconName: "Bandage",
    itemCount: 6,
    tags: ["Gauze Swabs", "Wound Care", "Bandages", "IV Fixators"],
    products: [
      {
        id: "sterile-absorbent-gauze-swabs",
        name: "Sterile Absorbent Gauze Swabs (100% Pure Cotton)",
        categorySlug: "hospital-dressing",
        subtitle: "Bleached surgical gauze with folded edges preventing loose threads",
        description:
          "Medical grade sterile gauze swabs woven from 100% natural cotton. Features folded safety edges to prevent linting and foreign particle contamination in open surgical wounds.",
        features: [
          "100% pure bleached cotton woven to 19x15 or 24x20 mesh counts",
          "Folded edges prevent fraying and loose surgical lint shedding",
          "Available with or without X-ray detectable barium sulfate threads (approx. 60% BaSO4)",
          "EO (Ethylene Oxide) gas sterilized in peelable pouches",
        ],
        specs: {
          "Sizes Available": "5cm x 5cm, 7.5cm x 7.5cm, 10cm x 10cm",
          "Ply Options": "8-ply, 12-ply, 16-ply thickness",
          "Sterilization": "Ethylene Oxide (EO) with chemical indicator dots",
          "Packaging": "5 swabs per sterile peel pack, 100 packs per dispenser box",
        },
        applications: ["Surgical Wound Packing", "Wound Cleansing", "Fluid & Exudate Absorption", "Post-Op Dressings"],
        certifications: ["ISO 13485:2016", "B.P. / U.S.P. Pharmacopeia Standard", "CE Mark"],
        badge: "B.P. Grade",
        inStock: true,
      },
      {
        id: "zinc-oxide-adhesive-plaster-spool",
        name: "Zinc Oxide Adhesive Plaster (Hospital Spool)",
        categorySlug: "hospital-dressing",
        subtitle: "Strong adhesion porous cotton tape with zinc oxide skin soother",
        description:
          "High-tensile cotton adhesive tape coated with medical zinc oxide glue. Provides strong skin adhesion while allowing moisture vapor transmission to prevent skin maceration.",
        features: [
          "Zinc oxide mass reduces skin irritation and adhesive trauma upon removal",
          "High-tensile cotton backing resists tearing under joint flexion stress",
          "Uniformly porous coating permits skin respiration",
          "Supplied in sturdy metal or plastic spools with snap-tight lids",
        ],
        specs: {
          "Widths Available": "1.25 cm, 2.5 cm, 5.0 cm, 7.5 cm, 10 cm",
          "Length": "5 meters and 10 meters rolls",
          "Base Material": "100% bleached woven cotton cloth",
          "Adhesive": "Medical grade zinc oxide natural rubber adhesive",
        },
        applications: ["Dressing Retention", "Surgical Tubing Fixation", "Splint Stabilization", "Orthopedic Strapping"],
        certifications: ["ISO 9001:2015", "CE Compliant"],
        badge: "High Adhesion",
        inStock: true,
      },
      {
        id: "transparent-iv-cannula-fixator",
        name: "Transparent IV Cannula Fixator Dressing with Pad",
        categorySlug: "hospital-dressing",
        subtitle: "Breathable polyurethane film dressing with non-adherent central pad",
        description:
          "Specially die-cut IV cannula dressing providing secure catheter anchoring and continuous visual site monitoring without dressing removal. Acts as an impenetrable barrier against external bacteria and viruses.",
        features: [
          "Ultra-thin semi-permeable polyurethane film allows oxygen exchange",
          "Waterproof barrier enables patient sponge baths while protecting puncture site",
          "Reinforced non-woven polyester fabric wings provide strong catheter stability",
          "Includes pre-cut sterile documentation strip for insertion date/time logging",
        ],
        specs: {
          "Dimensions": "6 cm x 7 cm, 7 cm x 8.5 cm, 8.5 cm x 10.5 cm",
          "Film Thickness": "20 – 25 microns breathable polyurethane",
          "Moisture Vapor Rate": "≥ 2500 g/m²/24h MVTR",
          "Sterility": "Gamma irradiated sterile peel packaging",
        },
        applications: ["Peripheral IV Line Fixation", "Central Venous Catheters", "Pediatric Infusion Sites"],
        certifications: ["ISO 13485:2016", "CE 0197"],
        badge: "Infection Barrier",
        inStock: true,
      },
      {
        id: "elastic-adhesive-bandage-bp",
        name: "Elastic Adhesive Bandage B.P. (Flesh Colored)",
        categorySlug: "hospital-dressing",
        subtitle: "Porous woven cotton elastic bandage for compression & support",
        description:
          "High-elasticity porous adhesive bandage woven from fast-edge cotton threads. Delivers sustained controlled compression for sports injuries, sprains, and varicose vein support.",
        features: [
          "Over 100% stretch elasticity provides flexible anatomical compression",
          "Central yellow centerline ensures accurate bandage overlap during application",
          "Feathered edges prevent constriction and pressure ridges on limbs",
          "Porous adhesive layout prevents sweat entrapment and maceration",
        ],
        specs: {
          "Widths": "5.0 cm, 7.5 cm, 8.0 cm, 10.0 cm",
          "Stretched Length": "4.5 meters per roll",
          "Composition": "Cotton and rayon elastic blend with zinc oxide adhesive",
        },
        applications: ["Orthopedic Compression", "Sprain & Strain Support", "Phlebology Bandaging", "Sports Medicine"],
        certifications: ["ISO 9001:2015", "B.P. Standards"],
        badge: "Controlled Tension",
        inStock: true,
      },
      {
        id: "paraffin-gauze-dressing-tulle-gras",
        name: "Paraffin Gauze Dressing (Tulle Gras)",
        categorySlug: "hospital-dressing",
        subtitle: "Sterile soft paraffin impregnated leno-weave wound contact layer",
        description:
          "Sterile non-adherent wound dressing impregnated with yellow soft paraffin. Protects the delicate granulating wound bed and enables pain-free dressing removal without tissue disruption.",
        features: [
          "Open leno-weave allows wound exudate to pass freely into secondary absorbent pad",
          "Soft paraffin coating prevents dressing adherence to raw wound surfaces",
          "Soothes superficial burns, donor graft sites, and skin abrasions",
          "Gamma sterile packed in aluminum foil blister trays",
        ],
        specs: {
          "Sizes": "10 cm x 10 cm, 10 cm x 30 cm",
          "Impregnation": "Soft white/yellow paraffin B.P. (≥ 175 g/m²)",
          "Weave": "100% bleached cotton leno mesh",
          "Sterilization": "Gamma radiation (25 kGy)",
        },
        applications: ["Superficial Burns & Scalds", "Skin Graft Donor/Recipient Sites", "Pressure Ulcers", "Lacerations"],
        certifications: ["ISO 13485:2016", "CE Mark"],
        badge: "Non-Adherent",
        inStock: true,
      },
      {
        id: "absorbent-cotton-wool-roll-bp",
        name: "Absorbent Cotton Wool Roll (Hospital Grade B.P.)",
        categorySlug: "hospital-dressing",
        subtitle: "100% natural long-staple cotton with supreme absorbency",
        description:
          "Pure long-staple cotton wool carded into a continuous uniform roll with protective craft paper interleaving. Highly absorbent for clinical cleansings, padding, and secondary dressing layers.",
        features: [
          "Free from impurities, leaf particles, and fluorescence brightening agents",
          "Rapid water sinking time: under 5 seconds sinking rate",
          "Uniform thickness without lumps or weak spots across the entire roll",
          "Interleaved with blue or brown craft paper for hygienic handling",
        ],
        specs: {
          "Weights Available": "100g, 200g, 400g, 500g, 1000g rolls",
          "Material": "100% natural carded long-fiber cotton",
          "Absorbency": "Holds over 23 times its weight in water",
        },
        applications: ["Surgical Pre-op Cleansing", "Orthopedic Cast Padding", "General Hospital Sanitization"],
        certifications: ["ISO 9001:2015", "B.P. Standards"],
        badge: "High Absorbency",
        inStock: true,
      },
    ],
  },
  {
    slug: "medical-disposables",
    title: "Medical Disposables & Infection Control",
    shortTitle: "Medical Disposables",
    headline: "Sterile single-use clinical supplies engineered for absolute infection barrier",
    description:
      "Cure Express manufactures IV cannulas, blood transfusion sets, sterile syringes, surgical gloves, face masks, protective gowns, and catheters designed for clinical safety and contamination control.",
    overview:
      "Medical disposables form the highest volume category in everyday hospital procedures. Our disposable manufacturing lines operate within Class 100,000 cleanrooms and adhere to zero-compromise biocompatibility and endotoxin testing protocols to guarantee patient safety, vein protection, and barrier defense against pathogens.",
    iconName: "Syringe",
    itemCount: 6,
    tags: ["IV Cannula", "Surgical Gloves", "Infusion Sets", "Syringes", "Masks"],
    products: [
      {
        id: "sterile-iv-cannula-with-port",
        name: "Sterile IV Cannula with Injection Port & Wings",
        categorySlug: "medical-disposables",
        subtitle: "Color-coded intravenous catheter with Japanese silicone back-cut needle",
        description:
          "Premium intravenous catheter with a medical-grade FEP / PTFE radio-opaque cannula and sharp back-cut needle for smooth, painless vein puncture. Features an injection port with non-return silicone valve.",
        features: [
          "Sharp triple-faceted back-cut needle reduces puncture resistance and pain",
          "Radio-opaque stripes along catheter for X-ray visibility confirmation",
          "Color-coded wings according to ISO 10555 standard for instant gauge recognition",
          "Transparent flashback chamber verifies immediate blood return",
        ],
        specs: {
          "Gauges Available": "14G (Orange), 16G (Grey), 18G (Green), 20G (Pink), 22G (Blue), 24G (Yellow), 26G (Violet)",
          "Flow Rates": "14G (305 ml/min) down to 26G (15 ml/min)",
          "Catheter Material": "Medical grade biocompatible PTFE / FEP",
          "Sterilization": "Ethylene Oxide (EO) sterile blister packaging",
        },
        applications: ["Intravenous Fluid Delivery", "Medication Administration", "Emergency Fluid Resuscitation"],
        certifications: ["ISO 13485:2016", "ISO 10555-5", "CE 0197"],
        badge: "Painless Puncture",
        inStock: true,
      },
      {
        id: "disposable-blood-transfusion-set",
        name: "Sterile Blood Transfusion Set with Micro-Filter",
        categorySlug: "medical-disposables",
        subtitle: "Cylindrical drip chamber with 200-micron blood clot mesh filter",
        description:
          "Gravity blood administration set equipped with a flexible cylindrical drip chamber and built-in 200µm filter to remove cellular debris, micro-aggregates, and blood clots during transfusion.",
        features: [
          "200-micron monofilament polyamide filter prevents clot entry into bloodstream",
          "Kink-resistant medical PVC tubing (150 cm length)",
          "Smooth roller clamp for precise transfusion rate adjustment",
          "Latex or latex-free flashball injection site for intermittent drug administration",
        ],
        specs: {
          "Drop Factor": "20 drops = 1 ml distilled water",
          "Filter Mesh": "200 microns surface area standard",
          "Needle": "Supplied with 18G sharp stainless steel needle",
          "Tube Length": "150 cm soft kink-resistant tubing",
        },
        applications: ["Whole Blood Transfusion", "Packed Red Blood Cells (PRBC)", "Fresh Frozen Plasma (FFP)"],
        certifications: ["ISO 13485:2016", "ISO 1135-4", "CE Mark"],
        badge: "Clot Protection",
        inStock: true,
      },
      {
        id: "latex-nitrile-surgical-gloves",
        name: "Sterile Powder-Free Latex & Nitrile Surgical Gloves",
        categorySlug: "medical-disposables",
        subtitle: "Micro-textured anatomical surgical gloves with beaded cuffs",
        description:
          "Ergonomically shaped curved-finger surgical gloves providing superior tactile sensitivity, high tensile tear resistance, and an effective microbial barrier for operating teams.",
        features: [
          "Anatomically shaped curved fingers reduce thumb fatigue during long surgeries",
          "Micro-textured palm and fingertip surface provides secure wet/dry instrument grip",
          "Polymer coated interior for effortless dry or damp hand donning",
          "Extremely low protein content (< 50 µg/g) minimizes allergic sensitization",
        ],
        specs: {
          "Sizes Available": "6.0, 6.5, 7.0, 7.5, 8.0, 8.5",
          "Length": "≥ 280 mm elongated cuff protection",
          "AQL Quality Standard": "AQL 0.65 / 1.0 sterile pinhole inspection",
          "Packaging": "1 pair per wallet and peel-pack, 50 pairs per dispenser box",
        },
        applications: ["Major Surgery", "Minor Procedures", "Endoscopy", "Sterile Catheterizations"],
        certifications: ["ISO 13485:2016", "EN 455 Parts 1-4", "ASTM D3577", "CE 0197"],
        badge: "AQL 0.65 Standard",
        inStock: true,
      },
      {
        id: "sterile-single-use-hypodermic-syringe",
        name: "Sterile Single-Use Syringes with Hypodermic Needle",
        categorySlug: "medical-disposables",
        subtitle: "Ultra-clear barrel 3-piece syringe with luer lock/slip tip",
        description:
          "High-clarity polypropylene 3-piece syringes with rubber piston gaskets for smooth, leak-proof aspiration and injection. Pre-mounted with ultra-sharp triple-beveled hypodermic needles.",
        features: [
          "Crystal-clear medical polypropylene barrel with indelible black volume markings",
          "Medical grade inert synthetic rubber piston with zero silicone leakage",
          "Positive plunger stop ring prevents accidental pull-out during aspiration",
          "Ultra-thin needle wall enables high flow rates with less puncture pain",
        ],
        specs: {
          "Capacities": "1 ml, 2 ml, 3 ml, 5 ml, 10 ml, 20 ml, 50 ml",
          "Tip Style": "Luer Slip and Luer Lock secure twist",
          "Needle Gauges": "Pre-attached 21G, 22G, 23G, 24G, 26G",
          "Sterilization": "Ethylene Oxide (EO) gas sterilized",
        },
        applications: ["Intramuscular (IM) Injections", "Intravenous (IV) Delivery", "Blood Sampling", "Vaccinations"],
        certifications: ["ISO 13485:2016", "ISO 7886-1", "CE Mark"],
        badge: "Leak-Proof",
        inStock: true,
      },
      {
        id: "surgical-3ply-mask-n95-respirator",
        name: "3-Ply Surgical Face Masks & N95 Particulate Respirators",
        categorySlug: "medical-disposables",
        subtitle: "High-filtration non-woven protective respiratory barrier",
        description:
          "Triple-layer certified surgical masks with high-density meltblown middle filter layer delivering ≥ 99% Bacterial Filtration Efficiency (BFE) and Particle Filtration Efficiency (PFE).",
        features: [
          "Outer hydrophobic spunbond layer repels blood splashes and bodily fluids",
          "Electrostatically charged meltblown filter captures sub-micron airborne microbes",
          "Ultra-soft hypoallergenic inner layer prevents skin irritation during prolonged wear",
          "Pliable aluminum nose bridge wire forms a tight ergonomic seal",
        ],
        specs: {
          "Filtration Efficiency": "BFE ≥ 99%, PFE ≥ 98% at 0.1 micron",
          "Fluid Resistance": "Resistant to synthetic blood penetration at 120 mmHg",
          "Breathability (Delta P)": "< 4.0 mm H2O/cm²",
          "Packaging": "50 masks per box, 40 boxes per master carton",
        },
        applications: ["Operating Rooms", "Infection Isolation Wards", "Hospital Visitors", "Dental Clinics"],
        certifications: ["ISO 13485:2016", "EN 14683 Type IIR", "ASTM F2100 Level 3", "CE Mark"],
        badge: "BFE ≥ 99%",
        inStock: true,
      },
      {
        id: "sterile-reinforced-surgical-gown",
        name: "Sterile Reinforced Surgical Gown & PPE Kits",
        categorySlug: "medical-disposables",
        subtitle: "AAMI Level 3/4 breathable viral barrier operating gowns",
        description:
          "High-performance SMS / SMMS fabric surgical gown with impervious reinforcements across chest and forearms. Protects surgical staff against high-pressure liquid and viral penetration.",
        features: [
          "Multi-layer SMMS fabric combines high tensile strength with soft breathability",
          "Ultrasonic welded seams eliminate stitch holes where liquids could penetrate",
          "Knitted soft elastic cuffs provide comfortable seal under surgical gloves",
          "Includes 2 sterile absorbent hand towels and sterile wrap transfer card",
        ],
        specs: {
          "Protection Level": "AAMI Level 3 & Level 4 liquid barrier",
          "Fabric Weight": "45 to 60 gsm SMMS non-woven with breathable PE film",
          "Sizes": "Medium, Large, X-Large, XX-Large",
          "Sterility": "EO gas sterilized single pouch",
        },
        applications: ["High Fluid Surgeries", "C-Section Deliveries", "Orthopedic Implantation", "Infectious Isolation"],
        certifications: ["ISO 13485:2016", "EN 13795", "AAMI PB70", "CE Mark"],
        badge: "AAMI Level 3/4",
        inStock: true,
      },
    ],
  },
  {
    slug: "pharmaceuticals",
    title: "Pharmaceuticals & Clinical Formulations",
    shortTitle: "Pharmaceuticals",
    headline: "Finished pharmaceutical formulations, sterile injectables & clinical wellness",
    description:
      "Cure Express manufactures and distributes finished WHO-GMP certified pharmaceuticals, oral dosage tablets, capsules, sterile injectables, oral suspensions, and clinical nutraceuticals.",
    overview:
      "Our pharmaceutical formulations division operates under strict adherence to World Health Organization Good Manufacturing Practices (WHO-GMP). We supply essential medicines, specialty therapeutic molecules, sterile hospital ampoules, and evidence-based nutraceutical supplements to domestic healthcare institutions and global export tenders.",
    iconName: "Pill",
    itemCount: 4,
    tags: ["WHO-GMP", "Injectables", "Oral Solids", "Nutraceuticals"],
    products: [
      {
        id: "finished-oral-solid-formulations",
        name: "Finished Pharmaceutical Tablets & Capsules (WHO-GMP)",
        categorySlug: "pharmaceuticals",
        subtitle: "Prescription generics in ALU-ALU and blister institutional packaging",
        description:
          "Comprehensive range of essential therapeutic tablets and hard gelatin capsules spanning antibiotics, analgesics, cardiovascular, gastrointestinal, and anti-diabetic molecules.",
        features: [
          "Manufactured under validated WHO-GMP cleanroom conditions",
          "High-barrier ALU-ALU blister foil protects sensitive active ingredients from humidity",
          "Batch-specific Certificate of Analysis (CoA) provided with every dispatch",
          "Complete stability studies conducted under Zone IV climatic conditions",
        ],
        specs: {
          "Dosage Forms": "Film-coated, enteric-coated, sustained-release tablets & capsules",
          "Packaging": "10x10 blister, 10x10 ALU-ALU, or hospital bulk bottles (500s/1000s)",
          "Therapeutic Categories": "Anti-infectives, Analgesics, Cardiac, Diabetology, GI Care",
        },
        applications: ["Hospital Inpatient Pharmacies", "Government Procurement Tenders", "Global Export Programs"],
        certifications: ["WHO-GMP", "ISO 9001:2015", "Schedule M Compliance"],
        badge: "WHO-GMP Certified",
        inStock: true,
      },
      {
        id: "sterile-injectable-ampoules-vials",
        name: "Sterile Injectable Vials & Liquid Ampoules",
        categorySlug: "pharmaceuticals",
        subtitle: "Class A terminal sterilization hospital injectable solutions",
        description:
          "Aseptic liquid parenterals and lyophilized powders for injection supplied in Type I borosilicate glass vials and USP neutral glass ampoules for hospital critical care.",
        features: [
          "Filled in Class 100 laminar airflow aseptic processing zones",
          "100% automated optical particulate and fill-volume inspection",
          "Depyrogenated and tested for zero bacterial endotoxins",
        ],
        specs: {
          "Volumes": "1ml, 2ml, 5ml, 10ml ampoules; 10ml, 20ml, 50ml, 100ml vials",
          "Containers": "USP Type I neutral borosilicate glass with flip-off seals",
          "Sterilization": "Terminal autoclaving or validated aseptic filtration",
        },
        applications: ["Emergency Resuscitation", "Intensive Care Sedation", "Hospital Anesthesia", "Oncology Care"],
        certifications: ["WHO-GMP", "ISO 13485:2016"],
        badge: "Critical Parenterals",
        inStock: true,
      },
      {
        id: "clinical-nutraceutical-complexes",
        name: "Evidence-Based Clinical Nutraceuticals & Supplements",
        categorySlug: "pharmaceuticals",
        subtitle: "Therapeutic vitamin, mineral, and antioxidant formulations",
        description:
          "Scientifically formulated nutraceutical complexes designed to support immune function, bone density, post-operative recovery, and neurological health.",
        features: [
          "High bioavailability chelated minerals and standardized botanical extracts",
          "Strict heavy metal and microbiological purity testing",
          "Sugar-free and allergen-tested formulations available",
        ],
        specs: {
          "Forms": "Softgels, effervescent tablets, gummies, and oral liquids",
          "Shelf Life": "24 to 36 months under controlled storage",
        },
        applications: ["Post-Op Convalescence", "Nutritional Deficiency", "Geriatric Care", "Immune Defense"],
        certifications: ["FSSAI", "ISO 22000:2018", "GMP Certified"],
        badge: "High Bioavailability",
        inStock: true,
      },
      {
        id: "dermatological-topical-ointments",
        name: "Hospital Dermatological Topicals & Antiseptic Ointments",
        categorySlug: "pharmaceuticals",
        subtitle: "Broad-spectrum antimicrobial and barrier repair creams",
        description:
          "Hospital-grade antiseptic creams, povidone-iodine solutions, burn care silver sulfadiazine formulations, and skin barrier protectant ointments.",
        features: [
          "Uniform micronized active pharmaceutical ingredients for optimal absorption",
          "Laminated aluminum collapsible tubes with tamper-evident seal",
          "Gentle non-staining and non-irritating clinical vehicle base",
        ],
        specs: {
          "Pack Sizes": "15g, 20g, 30g, 50g tubes; 100ml, 500ml institutional bottles",
          "Formulations": "Povidone Iodine, Silver Sulfadiazine, Chlorhexidine Gluconate",
        },
        applications: ["Burn Units", "Surgical Incision Care", "Bed Sore Management", "Minor Trauma"],
        certifications: ["WHO-GMP", "ISO 9001:2015"],
        badge: "Wound Antisepsis",
        inStock: true,
      },
    ],
  },
];

export function getProductBySlug(categorySlug: string, productId: string): ProductItem | undefined {
  const cat = productCategories.find((c) => c.slug === categorySlug);
  return cat?.products.find((p) => p.id === productId);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export function getAllProducts(): ProductItem[] {
  return productCategories.flatMap((c) => c.products);
}
