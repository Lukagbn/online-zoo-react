# 🦁 Online Zoo

An interactive online zoo platform where visitors can watch their favorite animals live via camera, explore animal profiles, read reviews, find zoo locations on an interactive map, and get in touch — all from the comfort of their browser.

Built with **React**, **Next.js**, **TypeScript**, and **SCSS**.

---

## ✨ Features

- 🐘 **Animal Profiles** — Each animal has its own page with a bio, description, "Did You Know" facts, and care information.
- 📹 **Live Camera** — Watch animals live through an interactive camera carousel.
- 🗺️ **Interactive Map** — A custom-designed map with interactive animal markers (Alligator, Eagle, Gorilla, Koala, Lemur, Lion, Panda, Tiger) pinpointing zoo locations.
- 💬 **Reviews** — Visitors can read testimonials and reviews left about the animals/zoo.
- 💰 **Donations** — Support the zoo and its animals through the donation section.
- 🔐 **Authentication** — Register and log in to unlock personalized features.
- 📞 **Contact Page** — Reach out to the zoo directly.
- 🛠️ **Admin Panel** — Animals are created and managed through a custom-built admin panel (separate project).

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 |
| Library | [React](https://react.dev/) 19 |
| Language | TypeScript |
| Styling | SCSS / CSS Modules |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) validation |
| Linting | ESLint 9 (flat config) + `eslint-config-next` |
| Backend | Custom backend built with **Node.js** + **MongoDB** (separate repository) |
| Admin Panel | Custom-built admin dashboard (separate repository) |

---

## 📁 Project Structure

```
public/
└── icons/
    ├── animalIcons/
    └── social/

src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── contact/
│   ├── map/
│   ├── zoos/
│   │   └── [id]/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx / layout.module.scss
│   ├── not-found.tsx / not-found.module.scss
│   └── page.tsx
│
├── components/
│   ├── AnimalBio/
│   │   ├── AnimalBioDescription/
│   │   ├── DidYouKnow/
│   │   └── TextBox/
│   ├── ArrowButtons/
│   │   ├── LeftArrow/
│   │   └── RightArrow/
│   ├── Aside/
│   │   └── AsideBox/
│   ├── Camera/
│   │   ├── CameraCarousel/
│   │   └── CameraTitle/
│   ├── Care/
│   │   └── CareCard/
│   ├── Donation/
│   │   └── MakeYourDonation/
│   │       └── DonationContent/
│   ├── DonationBanner/
│   ├── FetchError/
│   ├── Footer/
│   ├── HeroSection/
│   │   └── HeroIntro/
│   ├── Loader/
│   ├── Markers/
│   │   ├── AligatorMarker/
│   │   ├── EagleMarker/
│   │   ├── GorillaMarker/
│   │   ├── KoalaMarker/
│   │   ├── LemurMarker/
│   │   ├── LionMarker/
│   │   ├── PandaMarker/
│   │   ├── TigerMarker/
│   │   └── Markers.tsx
│   ├── Navbar/
│   ├── PayAndFeedHr/
│   │   └── PayAndFeedHr/
│   ├── PetSection/
│   │   └── PetCard/
│   ├── Social/
│   ├── Testimonials/
│   │   └── TestimonialsCard/
│   ├── TouchAnimal/
│   └── Logo.tsx
│
└── utils/
    ├── animalIcons.ts
    ├── animalImages.ts
    └── auth.ts
```

Each component generally follows the pattern of a `.tsx` file paired with a `.module.scss` (or `.scss`) file for scoped styling.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repository-url>
cd online-zoo-react
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory and configure it to point to your backend API:

```env
NEXT_PUBLIC_API_URL=<your-backend-url>
```

### Running the app

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 🔗 Related Projects

- **Backend API** — Node.js + MongoDB backend powering animal data, reviews, and authentication.
  🔗 [online-zoo-backend](https://github.com/Lukagbn/online-zoo-backend/)
- **Admin Panel** — Used to create and manage animals shown on the site.
  🔗 [online-zoo-admin](https://github.com/Lukagbn/online-zoo-admin/)

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `next` | React framework (App Router) |
| `react` / `react-dom` | UI library |
| `react-hook-form` | Form state management |
| `@hookform/resolvers` + `yup` | Schema-based form validation |
| `sass` | SCSS support |
