import { Injectable } from '@angular/core';

@Injectable()
export class DummyService {
  private dummy = {
    "clinics": [
      {"clinicID":"1001","name":"Test Clinic","website":"test@docon.co.in","contact":9999999999,
        "receptionistDoctors":[{"id":"recp1001","doctors":["doc1001","doc1002"]},{"id":"recp1002","doctors":["doc1001"]}]},
      {"clinicID":"1002","name":"Test Clinic 2","website":"test2@docon.co.in","contact":9999999999,
        "receptionistDoctors":[{"id":"recp1002","doctors":["doc1001"]}]}
    ],
    "doctors": [
      {"docID":"doc1001","firstName":"Test","lastName":"Pediatrician","mobileNumber":9999999999,"email":"paeds@docon.co.in","registration":"12345","speciality":"Pediatric","education":"MBBS"},
      {"docID":"doc1002","firstName":"Test","lastName":"Diabetologist","mobileNumber":9999999999,"email":"diabetes@docon.co.in","registration":"12345","speciality":"Diabetician","education":"MBBS"}
    ],
    "receptionists": [
      {"firstName":"Test1","lastName":"Receptionist1","gender":"Male","mobileNumber":9999999999,"receptionistID":"recp1001"},
      {"firstName":"Test2","lastName":"Receptionist2","gender":"Male","mobileNumber":9999999999,"receptionistID":"recp1002"}
    ]
  }

  constructor() { }

  getAll() {
    return {
      clinics: this.dummy.clinics.map(item => new Item(item.clinicID, item.name)),
      doctors: this.dummy.doctors.map(item => new Item(item.docID, [item.firstName, item.lastName].join(" "))),
      receptionists: this.dummy.receptionists.map(item => new Item(item.receptionistID, [item.firstName, item.lastName].join(" ")))
    }
  }

  getClinic(id: string): Item {
    let cli = this.dummy.clinics.find(i => i.clinicID == id)
    if (!cli) {
      return null
    }
    let item = new Item(id, cli.name, cli.website, cli.contact.toString())

    let docIds = this.flatten(cli.receptionistDoctors.map(rd => rd.doctors))
    item.child1 = this.dummy.doctors
      .filter(r => docIds.indexOf(r.docID) >= 0)
      .map(item => new Item(item.docID, [item.firstName, item.lastName].join(" "), item.education, item.speciality))

    let recIds = cli.receptionistDoctors.map(rd => rd.id)
    item.child2 = this.dummy.receptionists
      .filter(r => recIds.indexOf(r.receptionistID) >= 0)
      .map(item => new Item(item.receptionistID, [item.firstName, item.lastName].join(" ")))
    return item
  }

  getDoctor(id: string): Item {
    let doc = this.dummy.doctors.find(i => i.docID == id)
    if (!doc) {
      return null
    }
    let item = new Item(id, [doc.firstName, doc.lastName].join(" "), [doc.education, doc.speciality].join(), doc.email)
    
    item.child1 = this.dummy.clinics
      .filter(cli => this.flatten(cli.receptionistDoctors.map(rd => rd.doctors)).indexOf(id) >= 0)
      .map(item => new Item(item.clinicID, item.name, item.website, item.contact.toString()))

    let recIds = this.flatten(this.dummy.clinics.map(cli => cli.receptionistDoctors))
      .filter(rd => rd.doctors.indexOf(id) >= 0)
      .map(rd => rd.id)
    item.child2 = this.dummy.receptionists
      .filter(r => recIds.indexOf(r.receptionistID) >= 0)
      .map(item => new Item(item.receptionistID, [item.firstName, item.lastName].join(" ")))
    return item
  }

  getReceptionist(id: string): Item {
    let rec = this.dummy.receptionists.find(i => i.receptionistID == id)
    if (!rec) {
      return null
    }
    let item = new Item(id, [rec.firstName, rec.lastName].join(" "), rec.gender, rec.mobileNumber.toString())
    
    let docIds = this.flatten(this.flatten(this.dummy.clinics.map(cli => cli.receptionistDoctors))
      .filter(rd => rd.id == id)
      .map(rd => rd.doctors))
    item.child1 = this.dummy.doctors
      .filter(r => docIds.indexOf(r.docID) >= 0)
      .map(item => new Item(item.docID, [item.firstName, item.lastName].join(" "), item.education, item.speciality))

    let cliIds = []
    item.child2 = this.dummy.clinics
      .filter(cli => cli.receptionistDoctors.find(rd => rd.id == id))
      .map(item => new Item(item.clinicID, item.name))
    return item
  }

  private flatten(a: any[][]): any[] {
    let test = []
    for (let i = 0; i < a.length; i++ ) {
      for (let j = 0; j < a[i].length; j++ ) {
        if (test.indexOf(a[i][j]) == -1 ) {      
          test.push(a[i][j]);
        }
      }
    }
    return test;
  }
}

class Item {
  id: string
  name: string
  sub: string
  text: string
  child1: Item[]
  child2: Item[]

  constructor(id: string, name: string, sub = "", text = "") {
    this.id = id
    this.name = name
    this.sub = sub
    this.text = text
  }
}