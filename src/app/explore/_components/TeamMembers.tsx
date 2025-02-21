"use client";

import React from "react";
import Image from "next/image";

 const teamMembers = [
  { name: "Avia", role: "Team Leader", imageUrl: "/Avia.jpg", isLeader: true },
  { name: "Aviyas", role: "Developer", imageUrl: "/Aviyas.jpg", isLeader: false },
  { name: "Adiya", role: "Developer", imageUrl: "/Adiya.jpg", isLeader: false },
  { name: "Boldoo", role: "Developer", imageUrl: "/Boldoo.jpg", isLeader: false },
  { name: "Nasaa", role: "Developer", imageUrl: "/Nasaa.jpg", isLeader: false },
  { name: "Nurka", role: "Developer", imageUrl: "/Nurkaa.jpg", isLeader: false },
];

export const HomeTeam: React.FC = () => {
  return (
    <section className="team-section  bg-white">
      <h2>🚀 Meet Our Team</h2>
      <p className="team-description">We are passionate about building great things together.</p>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className={`team-member ${member.isLeader ? "leader" : ""}`}>
            <Image src={member.imageUrl} alt={member.name} width={180} height={180} className="team-image" />
            <p className="name">{member.name}</p>
            <p className="role">{member.role}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* General Styles */
        body {
          font-family: "Poppins", sans-serif;
          // background: #FFFFFF;
          color: #333;
        }

        h2 {
          text-align: center;
          font-size: 2.8rem;
          font-weight: bold;
          color: #222;
          margin-bottom: 10px;
        }

        .team-description {
          text-align: center;
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 30px;
        }

        /* Team Section */
        .team-section {
          padding: 70px 20px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff, #e3f2fd);
          border-radius: 12px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr); 
          gap: 20px;
          max-width: 1200px;
          margin: auto;
          justify-content: center;
        }

        /* Team Member Card */
        .team-member {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          padding: 15px;
          transition: transform 0.4s ease, box-shadow 0.3s ease;
          text-align: center;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          min-width: 180px;
        }

        .team-member:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }

        .team-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #ddd;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .team-member:hover .team-image {
          transform: scale(1.05);
          border-color: #bbb;
        }

        .name {
          font-size: 1.4rem;
          font-weight: bold;
          color: #222;
          margin-top: 10px;
        }

        .role {
          font-size: 1rem;
          color: #555;
        }

        /* Center Leader */
        .leader {
          // background: linear-gradient(135deg, #fffbeb, #ffefc2);
          // border: 2px solid #ffcc00;
          // box-shadow: 0 0 18px rgba(255, 204, 0, 0.6);
        }

        .leader .team-image {
          // border: 4px solid #ffcc00;
        }

        .leader .name {
          font-size: 1.6rem;
          color: #222;

        }

        .leader .role {
          font-weight: bold;
          color: #555;

        }

        /* Responsive */
        @media screen and (max-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media screen and (max-width: 768px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media screen and (max-width: 480px) {
          .team-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default HomeTeam;
