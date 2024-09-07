export function getSpecialtyWithSymptom(symptom) {
  // Helper function to convert text to title case
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Map of symptoms to specialties with symptoms in title case
  const symptomSpecialtyMap = {
    // Anesthesiology
    'Pain Management': 'Anesthesiology',
    'Chronic Pain': 'Anesthesiology',
    'Post-Surgical Pain': 'Anesthesiology',
    'Complications Related To Anesthesia': 'Anesthesiology',
    'Anesthesia Side Effects': 'Anesthesiology',

    // Cardiology
    'Chest Pain': 'Cardiology',
    'Shortness Of Breath': 'Cardiology',
    Palpitations: 'Cardiology',
    'Swelling In Legs Or Ankles': 'Cardiology',
    Fatigue: 'Cardiology',
    'Dizziness Or Lightheadedness': 'Cardiology',
    'High Blood Pressure': 'Cardiology',
    'Irregular Heartbeat': 'Cardiology',

    // Dermatology
    'Skin Rashes': 'Dermatology',
    Acne: 'Dermatology',
    Eczema: 'Dermatology',
    Psoriasis: 'Dermatology',
    'Unusual Moles Or Skin Growths': 'Dermatology',
    Itching: 'Dermatology',
    'Skin Infections': 'Dermatology',
    'Dry Or Oily Skin': 'Dermatology',
    'Hair Loss': 'Dermatology',

    // Emergency Medicine
    'Acute Injury Or Trauma': 'Emergency Medicine',
    'Severe Pain Or Discomfort': 'Emergency Medicine',
    'Sudden Onset Of Symptoms': 'Emergency Medicine',
    Unresponsiveness: 'Emergency Medicine',
    'Severe Bleeding': 'Emergency Medicine',
    'Head Trauma': 'Emergency Medicine',

    // Family Medicine
    'General Health Issues': 'Family Medicine',
    'Preventive Care': 'Family Medicine',
    'Common Illnesses': 'Family Medicine',
    'Chronic Disease Management': 'Family Medicine',
    'Minor Injuries And Illnesses': 'Family Medicine',
    'Health Screenings': 'Family Medicine',
    Vaccinations: 'Family Medicine',
    'Lifestyle And Wellness Counseling': 'Family Medicine',

    // Internal Medicine
    'Complex Or Chronic Illnesses': 'Internal Medicine',
    'Multi-System Issues': 'Internal Medicine',
    'Gastrointestinal Symptoms': 'Internal Medicine',
    'Unexplained Weight Loss': 'Internal Medicine',
    'Abdominal Pain': 'Internal Medicine',
    'Nausea Or Vomiting': 'Internal Medicine',
    'Persistent Cough': 'Internal Medicine',

    // Medical Genetics
    'Genetic Disorders': 'Medical Genetics',
    'Family History Of Genetic Conditions': 'Medical Genetics',
    'Genetic Testing And Counseling': 'Medical Genetics',
    'Birth Defects': 'Medical Genetics',
    'Inherited Conditions': 'Medical Genetics',
    'Genetic Predisposition To Diseases': 'Medical Genetics',

    // Neurology
    Headaches: 'Neurology',
    Seizures: 'Neurology',
    'Numbness Or Weakness': 'Neurology',
    'Memory Problems': 'Neurology',
    'Dizziness Or Vertigo': 'Neurology',
    Tremors: 'Neurology',
    'Difficulty With Coordination': 'Neurology',
    'Speech Difficulties': 'Neurology',

    // Nuclear Medicine
    'Imaging Studies For Diagnosis': 'Nuclear Medicine',
    'Evaluation Of Organ Function': 'Nuclear Medicine',
    'Bone Scans': 'Nuclear Medicine',
    'Thyroid Scans': 'Nuclear Medicine',
    'PET Scans': 'Nuclear Medicine',
    'Radioactive Tracer Studies': 'Nuclear Medicine',

    // Obstetrics and Gynecology
    'Menstrual Issues': 'Obstetrics and Gynecology',
    'Pregnancy-Related Symptoms': 'Obstetrics and Gynecology',
    'Pelvic Pain': 'Obstetrics and Gynecology',
    'Abnormal Vaginal Discharge': 'Obstetrics and Gynecology',
    'Heavy Menstrual Bleeding': 'Obstetrics and Gynecology',
    Infertility: 'Obstetrics and Gynecology',
    'Menopause Symptoms': 'Obstetrics and Gynecology',
    'Pregnancy Complications': 'Obstetrics and Gynecology',

    // Ophthalmology
    'Vision Problems': 'Ophthalmology',
    'Eye Pain': 'Ophthalmology',
    'Redness Or Irritation': 'Ophthalmology',
    'Double Vision': 'Ophthalmology',
    'Blurred Vision': 'Ophthalmology',
    'Sensitivity To Light': 'Ophthalmology',
    'Eye Infections': 'Ophthalmology',
    'Dry Eyes': 'Ophthalmology',

    // Orthopedic Surgery
    'Joint Pain': 'Orthopedic Surgery',
    'Bone Fractures': 'Orthopedic Surgery',
    'Ligament Injuries': 'Orthopedic Surgery',
    'Back Pain': 'Orthopedic Surgery',
    'Sports Injuries': 'Orthopedic Surgery',
    Arthritis: 'Orthopedic Surgery',
    'Joint Stiffness': 'Orthopedic Surgery',
    'Muscle Injuries': 'Orthopedic Surgery',

    // Otolaryngology (ENT)
    'Ear Pain': 'Otolaryngology (ENT)',
    'Nasal Congestion': 'Otolaryngology (ENT)',
    'Sore Throat': 'Otolaryngology (ENT)',
    'Hearing Loss': 'Otolaryngology (ENT)',
    'Sinus Problems': 'Otolaryngology (ENT)',
    'Hoarseness Or Voice Changes': 'Otolaryngology (ENT)',
    Nosebleeds: 'Otolaryngology (ENT)',
    Dizziness: 'Otolaryngology (ENT)',

    // Pathology
    'Diagnosis Of Diseases Through Tissue Samples': 'Pathology',
    'Abnormal Lab Test Results': 'Pathology',
    'Biopsy Results': 'Pathology',
    'Histopathological Examination': 'Pathology',
    'Cytological Examination': 'Pathology',
    Autopsy: 'Pathology',
    'Analysis Of Bodily Fluids': 'Pathology',

    // Pediatrics
    "Children's Health Issues": 'Pediatrics',
    'Growth And Development Concerns': 'Pediatrics',
    'Vaccination And Preventive Care': 'Pediatrics',
    'Common Childhood Illnesses': 'Pediatrics',
    'Behavioral Issues': 'Pediatrics',
    'Nutritional Problems': 'Pediatrics',
    'Developmental Milestones': 'Pediatrics',

    // Physical Medicine and Rehabilitation
    'Physical Injuries': 'Physical Medicine and Rehabilitation',
    'Mobility Issues': 'Physical Medicine and Rehabilitation',
    'Rehabilitation After Surgery Or Injury':
      'Physical Medicine and Rehabilitation',
    'Muscle Weakness': 'Physical Medicine and Rehabilitation',
    'Physical Therapy Needs': 'Physical Medicine and Rehabilitation',

    // Plastic Surgery
    'Cosmetic Surgery Needs': 'Plastic Surgery',
    'Reconstructive Surgery': 'Plastic Surgery',
    'Skin Grafts': 'Plastic Surgery',
    'Scar Revision': 'Plastic Surgery',
    'Breast Reconstruction': 'Plastic Surgery',
    'Facial Surgery': 'Plastic Surgery',
    'Hand Surgery': 'Plastic Surgery',

    // Psychiatry
    Depression: 'Psychiatry',
    Anxiety: 'Psychiatry',
    'Mood Disorders': 'Psychiatry',
    'Sleep Disorders': 'Psychiatry',
    Psychosis: 'Psychiatry',
    'Obsessive-Compulsive Disorder (OCD)': 'Psychiatry',
    'Post-Traumatic Stress Disorder (PTSD)': 'Psychiatry',

    // Radiation Oncology
    'Cancer Treatment Using Radiation': 'Radiation Oncology',
    'Tumor Management': 'Radiation Oncology',
    'Palliative Care For Cancer': 'Radiation Oncology',
    Brachytherapy: 'Radiation Oncology',
    'External Beam Radiation Therapy': 'Radiation Oncology',
    'Radiation Side Effects': 'Radiation Oncology',

    // Radiology
    'Diagnostic Imaging': 'Radiology',
    'Interpretation Of Imaging Results': 'Radiology',
    'X-Rays': 'Radiology',
    'CT Scans': 'Radiology',
    MRIs: 'Radiology',
    Ultrasounds: 'Radiology',
    Mammograms: 'Radiology',
    'Interventional Procedures': 'Radiology',

    // Surgery
    'Surgical Intervention': 'Surgery',
    'Pre- And Post-Operative Care': 'Surgery',
    'Elective Surgeries': 'Surgery',
    'Emergency Surgeries': 'Surgery',
    'Laparoscopic Procedures': 'Surgery',
    'General Surgical Issues': 'Surgery',
    'Recovery Management': 'Surgery',

    // Urology
    'Urinary Tract Symptoms': 'Urology',
    'Prostate Issues': 'Urology',
    'Kidney Stones': 'Urology',
    Incontinence: 'Urology',
    'Painful Urination': 'Urology',
    'Blood In Urine': 'Urology',
    'Sexual Dysfunction': 'Urology',
    'Bladder Infections': 'Urology',
  };

  // Normalize the entered symptom and return the corresponding specialty
  const formattedSymptom = toTitleCase(symptom);
  return (
    symptomSpecialtyMap[formattedSymptom] ||
    'Specialty not found for this symptom'
  );
}
