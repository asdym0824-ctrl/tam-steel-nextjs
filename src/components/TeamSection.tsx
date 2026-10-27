import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import { teamMembers } from '../data/teamData';
import { Users, Mail, Award } from 'lucide-react';

interface TeamSectionProps {
  currentLang: Language;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="py-16 bg-[#28242f] border-t border-[#b4c5e4]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#fbfff1] bg-[#3066be]/20 px-3.5 py-1 rounded-full border border-[#3066be]/40 mb-3">
            <Users className="w-3.5 h-3.5 text-[#3066be]" />
            <span>نخبگان متالورژی و مدیریت بازرگانی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#fbfff1]">
            {t.teamSection.title}
          </h2>
          <p className="text-[#b4c5e4] text-sm sm:text-base mt-2">
            {t.teamSection.subtitle}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300 hover:brightness-105">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#3c3744] border border-[#b4c5e4]/20 hover:border-[#3066be] rounded-3xl p-6 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-[#090c9b]/30 hover:-translate-y-1 hover:scale-[1.02] hover:brightness-105 cursor-pointer"
            >
              <div>
                {/* Avatar with Photo or Fallback Initials */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#090c9b] to-[#3066be] border-2 border-[#b4c5e4]/30 flex items-center justify-center font-bold text-[#fbfff1] text-lg shadow-md shadow-[#090c9b]/30 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name[currentLang]}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      member.name[currentLang].slice(0, 2)
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#fbfff1] group-hover:text-[#b4c5e4] transition-colors">
                      {member.name[currentLang]}
                    </h3>
                    <div className="text-xs text-[#b4c5e4] font-medium">
                      {member.role[currentLang]}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#b4c5e4] mb-3">
                  <Award className="w-3.5 h-3.5 text-[#3066be] shrink-0" />
                  <span>{member.experienceYears} {t.teamSection.experience}</span>
                </div>

                <p className="text-xs text-[#b4c5e4]/90 leading-relaxed mb-4">
                  {member.bio[currentLang]}
                </p>

                {/* Specialties */}
                <div className="space-y-1 mb-4">
                  <div className="text-[11px] font-semibold text-[#475569] dark:text-[#b4c5e4]/70">
                    {t.teamSection.specialties}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.expertise.map((exp, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-[#475569] dark:text-[#fbfff1] bg-[#f1f5f9] dark:bg-[#242129] border border-[#e2e8f0] dark:border-[#b4c5e4]/20 px-2.5 py-0.5 rounded-lg"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact direct email */}
              <div className="pt-3 border-t border-[#b4c5e4]/15 flex items-center justify-between text-[11px]">
                <a
                  href={`mailto:${member.contactEmail}`}
                  className="text-[#b4c5e4] hover:text-[#fbfff1] flex items-center gap-1 transition-colors font-mono"
                >
                  <Mail className="w-3 h-3 text-[#3066be]" />
                  <span>{member.contactEmail}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
