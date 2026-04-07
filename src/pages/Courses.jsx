import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import styles from '../assets/css/Courses.module.css';
import { useState } from "react";

const Courses = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const courses = [
    {
      title: "Free Course",
      duration: "Duration: 1 Months",
      desc: <br/>,
      content: [
        "Module 1 : Microsoft Excel",
        "Module 2 : Microsoft word",
        "Module 3 : Basic Computer",
      ],
    },
    {
      title: "Tally Prime",
      duration: "Duration: 3 Months",
      desc: <br/>,
      content: [
        "Module 1 : Special Fundamental & Financial Accounting - Introduction",
        "Module 2 : Transactions Vouchers",
        "Module 3 : Inventory Information & Features",
        "Module 4 : Statuary & Taxations GST",
        "Module 5 : View Reports",
      ],
    },
    {
      title: "Beginner Accounting",
      duration: "Duration: 6 Months",
      desc: <strong>FREE: Banking & Accounting in MS Excel</strong>,
      content: [
        <strong>Part A : Financial Accounting[Manual Accounting]</strong>,
        "Module A : Principles & Rules of Accounting",
        "Module B : Bookkeeping & Practice",
        "Module C : Stock & Inventory Maintain",
        "Module D : Goods & Service Tax [GST]",
        "Module E : Soft Skill Development",
        "Module F : Office Documentation & Record Management",
        "Module G : Banking Operation",
        <strong>Part B : Computerized Accounting[Tally Prime]</strong>,
        "Module 1 : Special Fundamental & Financial Accounting",
        "Module 2 : Transactions Vouchers",
        "Module 3 : Inventory Information & Features",
        "Module 4 : Statuary & Taxations GST",
        "Module 5 : View Reports"
      ],
    },
    {
      title: "Achiever's Accounting",
      duration: <strong>Duration: 8 Months[7 month course + 1 month job]</strong>,
      desc: <strong>FREE: Banking & Accounting in MS Excel</strong>,
      content: [
        <strong>Part A : Financial Accounting[Manual Accounting]</strong>,
        "Module A : Principles & Rules of Accounting",
        "Module B : Bookkeeping & Practice",
        "Module C : Stock & Inventory Maintain",
        "Module D : Goods & Service Tax [GST]",
        "Module E : Soft Skill Development",
        "Module F : Office Documentation & Record Management",
        "Module G : Banking Operation",
        "Module H : Tax Deduction at Sources[TDS]",
        "Module I : Income Tax",
        <strong>Part B : Computerized Accounting[Tally Prime]</strong>,
        "Module 1 : Special Fundamental & Financial Accounting",
        "Module 2 : Transactions Vouchers",
        "Module 3 : Inventory Information & Features",
        "Module 4 : Statuary & Taxations GST",
        "Module 5 : View Reports",
        "Module 6 : Audit Trail Analysis & Reports",
      ],
    },
    {
      title: "Advance Accounting",
      duration: <strong>Duration: 12 Months[9 month course + 3 month job]</strong>,
      desc: <strong>FREE: Banking,MS Word & Excel & Online Application & Forms</strong>,
      content: [
        <strong>Part A : Financial Accounting[Manual Accounting]</strong>,
        "Module A : Principles & Rules of Accounting",
        "Module B : Bookkeeping & Practice",
        "Module C : Stock & Inventory Maintain",
        "Module D : Goods & Service Tax [GST]",
        "Module E : Soft Skill Development",
        "Module F : Office Documentation & Record Management",
        "Module G : Banking Operation",
        "Module H : Tax Deduction at Sources[TDS]",
        "Module I : Income Tax",
        "Module J : Preparation of Finalized Accounting & Checking method",
        "Module K : Payroll/Salary Managements",
        "Module L : Discussion on Fixed Assets",
        "Module M : Discussion on Project Reports,Documentations & Financial Data Analyses",
        <strong>Part B : Computerized Accounting[Tally Prime]</strong>,
        "Module 1 : Special Fundamental & Financial Accounting",
        "Module 2 : Transactions Vouchers",
        "Module 3 : Inventory Information & Features",
        "Module 4 : Statuary & Taxations GST",
        "Module 5 : View Reports",
        "Module 6 : Audit Trail Analysis & Reports",
        "Module 7 : Statuary & Taxations TDS",
        "Module 8 : Financial Data Analyses in Tally Prime & Adjustments of Entries",
      ],
    },
    {
      title: "Online Certificate Course",
      duration: "Duration: 6 to 12 months",
      desc: <br/>,
      content: [
        "Module 1 : Advance Diploma in Accounting Management",
        "Module 2 : Certificate in Tally",
        "Module 3 : Course on Computer Concept",
        "Module 4 : Diploma in Fire & Safety Management",
        "Module 5 : Diploma in Solar Energy Technician",
        "Module 6 : Diploma in Panchayati Raj & Rural Management",
        "Module 7 : Diploma in Animal Husbandry",
        "Module 8 : PGDCA",
        "Module 9 : Yoga Teacher",
      ],
    },
  ];

  return (
    <div className={styles.root}>
      <Nav />
      <h1 className={styles.heading}>Our Courses / Training [Medium Hindi / English]</h1>

      <div className={styles.grid}>
        {courses.map((course, index) => (
          <div key={index} className={styles.card}>

            {/* Card Top */}
            <div className={styles.cardHeader}>
              <h2>{course.title}</h2>
              <p>{course.duration}</p>
            </div>

            {/* Short Description */}
            <p className={styles.desc}>{course.desc}</p>

            {/* Button */}
            <button
              className={styles.btn}
              onClick={() => toggle(index)}
            >
              {openIndex === index ? "Hide Model −" : "View Model +"}
            </button>

            {/* Expand Content */}
            <div
              className={
                openIndex === index
                  ? `${styles.content} ${styles.show}`
                  : styles.content
              }
            >
            </div>
            {/* Dynamic Content  */}
            <div className={openIndex === index ? `${styles.content} ${styles.show}` : styles.content}>
              <ul>
                {course.content.map((item, i) => (
                  <li key={i}> {item}</li>
                ))}
              </ul>
            </div>


          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Courses;