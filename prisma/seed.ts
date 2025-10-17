import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const dbPath = path.join(process.cwd(), 'db.json');
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  // Seed Programs
  for (const program of dbData.programs) {
    await prisma.program.create({
      data: {
        db_id: program.id,
        name: program.name,
        subtitle: program.subtitle,
        imageUrl: program.imageUrl,
        description: program.description,
        keyFocus: program.keyFocus,
        suitability: program.suitability,
        tagline: program.tagline,
        detailedDescription: program.detailedDescription,
        keyTechniques: program.keyTechniques,
        schedule: program.schedule,
        gear: program.gear,
        testimonial: program.testimonial,
      },
    });
  }

  // Seed Coaches
  for (const coach of dbData.coaches) {
    await prisma.coach.create({
      data: {
        db_id: coach.id,
        name: coach.name,
        title: coach.title,
        disciplines: coach.disciplines,
        specializations: coach.specializations,
        certifications: coach.certifications,
        imageUrl: coach.imageUrl,
        videoUrl: coach.videoUrl,
        bio: coach.bio,
        philosophy: coach.philosophy,
        achievements: coach.achievements,
        gallery: coach.gallery,
      },
    });
  }

  // Seed Schedule
  for (const item of dbData.schedule) {
    await prisma.schedule.create({
      data: {
        db_id: item.id,
        datetime: new Date(item.datetime),
        discipline: item.discipline,
        coachId: item.coachId,
        duration: item.duration,
      },
    });
  }

  // Seed Pricing
  for (const pricing of dbData.pricing) {
    await prisma.pricing.create({
      data: {
        db_id: pricing.id,
        title: pricing.title,
        tiers: {
          create: pricing.tiers.map((tier: any) => ({
            db_id: tier.id,
            name: tier.name,
            price: tier.price,
            period: tier.period,
            description: tier.description,
            features: tier.features,
            isFeatured: tier.isFeatured,
          })),
        },
      },
    });
  }

  // Seed Settings
  const settings = dbData.settings;
  await prisma.settings.create({
    data: {
      heroTitle: settings.heroTitle,
      heroSlides: settings.heroSlides,
      testimonials: settings.testimonials,
      cta: settings.cta,
      programsSection: settings.programsSection,
      imageSectionTraining: settings.imageSectionTraining,
      gymFeaturesSection: settings.gymFeaturesSection,
      coreValuesSection: settings.coreValuesSection,
      teamPhotoSection: settings.teamPhotoSection,
      coachesSectionIntro: settings.coachesSectionIntro,
      scheduleSection: settings.scheduleSection,
      pricingSection: settings.pricingSection,
      newsletterSection: settings.newsletterSection,
      coachesHeroSection: settings.coachesHeroSection,
      scheduleHeroSection: settings.scheduleHeroSection,
      pricingHeroSection: settings.pricingHeroSection,
    },
  });

  // Seed WhyChooseUs
  const whyChooseUs = dbData.whyChooseUs;
  await prisma.whyChooseUs.create({
    data: {
      title: whyChooseUs.title,
      description: whyChooseUs.description,
      features: whyChooseUs.features,
    },
  });

  // Seed DisciplinesHeroSection
  const disciplinesHeroSection = dbData.disciplinesHeroSection;
  await prisma.disciplinesHeroSection.create({
    data: {
      backgroundImageUrl: disciplinesHeroSection.backgroundImageUrl,
      mainHeadline: disciplinesHeroSection.mainHeadline,
      subHeadline: disciplinesHeroSection.subHeadline,
    },
  });

  // Seed MembershipPage
  const membershipPage = dbData.membershipPage;
  await prisma.membershipPage.create({
    data: {
      freeTrial: membershipPage.freeTrial,
      importantNotes: membershipPage.importantNotes,
      inquiryForm: membershipPage.inquiryForm,
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
