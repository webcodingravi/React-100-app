import React from 'react'
import moment from 'moment'
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'

const App=() => {
  const data=[
    {
      "id": "5DtOj6MARkENTsOTA1-wN",
      "fullname": "Paula Doyle",
      "email": "Jenifer.Schulist@yahoo.com",
      "mobile": "+14563643075",
      "gender": "Cis female",
      "address": "580 Princess Street Suite 186",
      "city": "Paucekstead",
      "state": "Massachusetts",
      "country": "Moldova",
      "pincode": 2249,
      "createdAt": "2025-06-18T12:21:28.857Z"
    },
    {
      "id": "j4SM_VMnF_yHeCzbJGjk1",
      "fullname": "Verna Tillman",
      "email": "Hardy_Monahan96@gmail.com",
      "mobile": "+16628245734",
      "gender": "F2M",
      "address": "41181 Emmy Gateway Apt. 161",
      "city": "South Nyaburgh",
      "state": "Illinois",
      "country": "Qatar",
      "pincode": 280131,
      "createdAt": "2026-05-06T22:09:14.812Z"
    },
    {
      "id": "cBXh6gqmtkc4rMqhUPmlx",
      "fullname": "Roosevelt Towne",
      "email": "Laney.Medhurst17@gmail.com",
      "mobile": "+14759777481",
      "gender": "M2F",
      "address": "164 New Road Apt. 133",
      "city": "Lake Roscoe",
      "state": "Mississippi",
      "country": "Bahrain",
      "pincode": 632282,
      "createdAt": "2025-08-10T07:13:41.811Z"
    },
    {
      "id": "coSikmki0ajobWmsLP04C",
      "fullname": "Ms. Melba Nikolaus",
      "email": "Rachelle_Hayes@yahoo.com",
      "mobile": "+12886127696",
      "gender": "Trans man",
      "address": "115 Maud Roads Suite 578",
      "city": "Port Giaburgh",
      "state": "Wisconsin",
      "country": "Latvia",
      "pincode": 36240,
      "createdAt": "2026-01-13T16:38:31.271Z"
    },
    {
      "id": "Civ_3zOQTHVUPXGGbwgjO",
      "fullname": "Mrs. Lisa Wintheiser",
      "email": "Harmony_MacGyver@hotmail.com",
      "mobile": "+14693769152",
      "gender": "Hermaphrodite",
      "address": "99756 Oaklands Suite 994",
      "city": "Tulare",
      "state": "Tennessee",
      "country": "Malaysia",
      "pincode": 72249,
      "createdAt": "2026-01-20T10:48:07.818Z"
    },
    {
      "id": "Qrmm7_yjj_VJQo1r27cGP",
      "fullname": "Mitchell Howell",
      "email": "Brielle_Kemmer@hotmail.com",
      "mobile": "+18138890272",
      "gender": "Hermaphrodite",
      "address": "73564 Buster Ports Apt. 708",
      "city": "Tyriquehaven",
      "state": "Virginia",
      "country": "Tunisia",
      "pincode": 3252,
      "createdAt": "2026-01-16T19:20:12.455Z"
    },
    {
      "id": "BUMkWaJ7frMMUZgtq1X7Q",
      "fullname": "Gabriel Gleichner Sr.",
      "email": "Darian.Morar55@hotmail.com",
      "mobile": "+12965926962",
      "gender": "Omnigender",
      "address": "2009 Uriah Street Apt. 867",
      "city": "Elseland",
      "state": "Alabama",
      "country": "Bahamas",
      "pincode": 24073,
      "createdAt": "2024-10-09T08:16:23.754Z"
    },
    {
      "id": "oxy1iLqMCMpKmnzJ6MF6i",
      "fullname": "Iris Hane",
      "email": "Bessie37@yahoo.com",
      "mobile": "+15689036593",
      "gender": "Genderqueer",
      "address": "17168 Roberts Shore Apt. 405",
      "city": "Paterson",
      "state": "New Jersey",
      "country": "Liechtenstein",
      "pincode": 46400,
      "createdAt": "2024-10-17T00:29:00.893Z"
    },
    {
      "id": "0QOYAJG9kkVb9AbIDH1JD",
      "fullname": "James Mayer",
      "email": "Jonathon.Johnston74@hotmail.com",
      "mobile": "+18758736223",
      "gender": "Trans person",
      "address": "3057 Padberg Mills Apt. 316",
      "city": "Predovictown",
      "state": "Missouri",
      "country": "Pakistan",
      "pincode": 25505,
      "createdAt": "2026-02-13T21:37:43.595Z"
    },
    {
      "id": "KniwN-WxYfJb76jZOv1KT",
      "fullname": "Clinton Torphy-Dickinson",
      "email": "Odessa.Schultz@hotmail.com",
      "mobile": "+14747441410",
      "gender": "Trans female",
      "address": "304 Boehm Cliff Apt. 354",
      "city": "Port Ramonaton",
      "state": "West Virginia",
      "country": "South Africa",
      "pincode": 683646,
      "createdAt": "2025-09-01T11:23:34.448Z"
    },
    {
      "id": "m9dt4qlRC8V6WQjdgGEgx",
      "fullname": "Miss Natasha Pacocha",
      "email": "Sincere.Mosciski@hotmail.com",
      "mobile": "+19256145281",
      "gender": "Demi-man",
      "address": "7333 Schmidt Underpass Suite 190",
      "city": "Satterfieldstad",
      "state": "Oklahoma",
      "country": "Taiwan",
      "pincode": 891124,
      "createdAt": "2025-11-25T09:54:50.925Z"
    },
    {
      "id": "ImR4X1m5JEZbzTzcn7qOc",
      "fullname": "Ignacio Monahan",
      "email": "Jillian_Jenkins61@hotmail.com",
      "mobile": "+18867946530",
      "gender": "Cis female",
      "address": "392 Ella Loop Suite 380",
      "city": "Fort Virgie",
      "state": "North Dakota",
      "country": "Serbia",
      "pincode": 37459,
      "createdAt": "2026-02-21T11:28:02.865Z"
    },
    {
      "id": "hbz3hnizViZYqHv10NNBx",
      "fullname": "Shari Auer",
      "email": "Rhett82@hotmail.com",
      "mobile": "+19764384257",
      "gender": "Cisgender woman",
      "address": "58871 Witting Course Suite 898",
      "city": "Binghamton",
      "state": "Colorado",
      "country": "Serbia",
      "pincode": 4236,
      "createdAt": "2025-09-04T02:52:41.424Z"
    },
    {
      "id": "mLYOGDf8GnfDqZMWqmYzl",
      "fullname": "Jerald Kub-Langworth",
      "email": "Allan33@hotmail.com",
      "mobile": "+16897345004",
      "gender": "Multigender",
      "address": "3558 Meredith Views Suite 250",
      "city": "Coconut Creek",
      "state": "Kansas",
      "country": "Kenya",
      "pincode": 267339,
      "createdAt": "2025-10-10T15:07:45.052Z"
    },
    {
      "id": "V7fyfiEH5COVEf68b7z20",
      "fullname": "Dr. Joe Stroman",
      "email": "Lucile.Walker@gmail.com",
      "mobile": "+12989659754",
      "gender": "Demi-man",
      "address": "16478 Kevon Mews Apt. 221",
      "city": "Lake Landenstead",
      "state": "West Virginia",
      "country": "Puerto Rico",
      "pincode": 294886,
      "createdAt": "2025-07-03T04:57:41.723Z"
    },
    {
      "id": "-_1KZx-v6ADQTYm3iNd_a",
      "fullname": "Eloise Wisozk",
      "email": "Buddy92@hotmail.com",
      "mobile": "+16483119414",
      "gender": "Gender neutral",
      "address": "18109 McGlynn Circles Apt. 634",
      "city": "North Shainastead",
      "state": "New York",
      "country": "Denmark",
      "pincode": 39378,
      "createdAt": "2025-04-26T12:05:26.841Z"
    },
    {
      "id": "svytA0OGY92tVX-uSXdkg",
      "fullname": "Kenneth Collier",
      "email": "Elnora.Gerhold66@yahoo.com",
      "mobile": "+12752255109",
      "gender": "T* woman",
      "address": "4229 Burley Islands Suite 528",
      "city": "South Garnett",
      "state": "Alaska",
      "country": "Gambia",
      "pincode": 79718,
      "createdAt": "2025-01-25T22:38:03.028Z"
    },
    {
      "id": "-OXfU6lAaxrQh_qewdNoG",
      "fullname": "Vivian Morissette",
      "email": "Eulalia.Zboncak-Hirthe@hotmail.com",
      "mobile": "+18577412077",
      "gender": "Pangender",
      "address": "96082 Veum Mount Suite 963",
      "city": "Janetstead",
      "state": "Alabama",
      "country": "Denmark",
      "pincode": 882868,
      "createdAt": "2024-10-18T16:32:16.365Z"
    },
    {
      "id": "y2QtFgAsZ71z-Zmfvfwsu",
      "fullname": "Randal Hand",
      "email": "Annalise1@gmail.com",
      "mobile": "+18919917566",
      "gender": "Trans man",
      "address": "644 Feil Drive Suite 860",
      "city": "Pricefurt",
      "state": "Washington",
      "country": "Botswana",
      "pincode": 620842,
      "createdAt": "2025-10-19T05:49:38.404Z"
    },
    {
      "id": "OMC34QJixWj9cr07DrQ-N",
      "fullname": "Dr. Velma Buckridge",
      "email": "Ocie.Thiel16@yahoo.com",
      "mobile": "+13234733081",
      "gender": "Cis",
      "address": "59571 Harold Ridge Suite 222",
      "city": "Middletown",
      "state": "New Hampshire",
      "country": "Senegal",
      "pincode": 594370,
      "createdAt": "2025-01-17T04:22:00.218Z"
    }
  ]

  const columns=[
    { header: 'ID', dataKey: 'id' },
    { header: 'Fullname', dataKey: 'fullname' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Mobile', dataKey: 'mobile' },
    { header: 'Gender', dataKey: 'gender' },
    { header: 'Country', dataKey: 'country' },
  ]

  const exportToPdf=() => {
    const Pdf=new jsPDF()
    autoTable(Pdf, {
      columns,
      body: data,
      theme: "grid",
      style: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] }
    })
    Pdf.save("document.pdf")
  }

  return (
    <>
      <div className='bg-gray-200 min-h-screen py-12'>
        <div className='w-9/12 mx-auto p-12 bg-white rounded-xl'>
          <div className='flex justify-between items-center'>
            <h1 className='text-4xl font-bold'>Export to PDF</h1>
            <button onClick={exportToPdf} className='text-white bg-violet-600 px-6 py-2.5 rounded-xl hover:scale-120 duration-300 cursor-pointer'>Export</button>
          </div>
          <div className='overflow-x-auto'>
            <table className='table-auto min-w-max mt-10'>
              <thead>
                <tr className='bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-white text-left'>
                  <th className='pl-4 py-3'>ID</th>
                  <th>Fullname</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Pincode</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item, index) => (
                    <tr className='border-b border-b-gray-200 text-neutral-600' key={index}>
                      <td className='pl-4 py-3'>{item.id}</td>
                      <td>{item.fullname}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.gender}</td>
                      <td>{item.address}</td>
                      <td>{item.city}</td>
                      <td>{item.state}</td>
                      <td>{item.country}</td>
                      <td>{item.pincode}</td>
                      <td>{moment(item.createdAt).format('DD MMM YYYY, hh:mm A')}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}

export default App