{
    "patient": {
      "name": {"$choose": {"from": ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Henry", "Ivy", "Jack"]}},
      "age": {"$choose": {"from": [25, 30, 35, 40, 45, 50, 55, 60, 65, 70]}},
      "gender": {"$choose": {"from": ["Male", "Female"]}},
      "address": {"$choose": {"from": ["123 Main St", "456 Oak Ave", "789 Pine Blvd", "101 Elm St", "202 Maple Dr", "303 Cedar Ln", "404 Birch Rd", "505 Spruce Ct", "606 Walnut Ave", "707 Pine Ln"]}},
      "contact": {"$choose": {"from": ["555-1234", "555-5678", "555-9012", "555-3456", "555-7890", "555-2345", "555-6789", "555-0123", "555-4567", "555-8901"]}}
    },
    "medical_history": {
      "blood_type": {"$choose": {"from": ["A+", "B+", "O+", "AB+"]}},
      "allergies": {"$array": {"of": {"$choose": {"from": ["Penicillin", "Pollen", "Dust"]}}, "number": {"$number": {"min": 0, "max": 3}}}},
      "conditions": {"$array": {"of": {"$choose": {"from": ["Hypertension", "Asthma", "Diabetes"]}}, "number": {"$number": {"min": 0, "max": 2}}}},
      "medications": {
        "$array": {
          "of": {
            "name": {"$choose": {"from": ["Aspirin", "Ventolin", "Ibuprofen"]}},
            "dosage": {"$choose": {"from": ["50mg", "100mg", "200mg", "150mg", "75mg", "250mg", "300mg", "120mg", "180mg", "90mg"]}},
            "frequency": {"$choose": {"from": ["Once daily", "Twice daily", "As needed"]}}
          },
          "number": {"$number": {"min": 1, "max": 2}}
        }
      }
    },
    "checkups": {
      "$array": {
        "of": {
          "date": {"$choose": {"from": ["2022-01-15", "2022-03-20", "2022-05-10", "2022-07-05", "2022-09-28", "2022-11-15", "2023-01-10", "2023-03-25", "2023-05-20", "2023-07-15"]}},
          "height": {"$choose": {"from": ["170 cm", "175 cm", "180 cm", "165 cm", "160 cm", "185 cm", "172 cm", "168 cm", "178 cm", "182 cm"]}},
          "weight": {"$choose": {"from": ["70 kg", "65 kg", "75 kg", "68 kg", "80 kg", "62 kg", "73 kg", "77 kg", "85 kg", "67 kg"]}},
          "blood_pressure": {"$choose": {"from": ["120/80 mmHg", "118/76 mmHg", "122/82 mmHg", "115/75 mmHg", "125/85 mmHg", "130/88 mmHg", "115/70 mmHg", "128/84 mmHg", "121/78 mmHg", "135/90 mmHg"]}},
          "heart_rate": {"$choose": {"from": [60, 65, 70, 75, 80, 85, 90, 95, 100, 105]}},
          "doctor_notes": {"$choose": {"from": ["Routine checkup. No significant issues observed.", "Minor respiratory concerns. Prescribed Ventolin as needed.", "Patient is in good health. Advised to continue current medications.", "Scheduled follow-up in six months.", "Referred to a specialist for further evaluation.", "Advised on lifestyle modifications for better health.", "Prescribed additional medication for a specific condition.", "Recommended dietary changes.", "Discussed exercise routine.", "Provided information on preventive care."]}
          }
        },
        "number": {"$number": {"min": 1, "max": 4}}
      }
    }
  }
  