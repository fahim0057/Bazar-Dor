<div align="center">

# 🛒 বাজার দর · BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**
*Daily essential-goods prices across Bangladesh's bazars, at a glance.*

---

## 📖 About

**BazarDor (বাজার দর)** is a responsive web app that shows today's prices of everyday essentials such as rice, lentils, oil, vegetables, fish, meat, eggs, dairy and spices. Prices are shown in Bangla digits, with the change since yesterday, and a market-by-market breakdown for every product.

Visitors can browse prices freely. Detailed per-bazar price tables are available after signing in.

🔗 **Live site:** https://bazar-dor-evjo.vercel.app/

---

## ✨ Key Features

1. **📈 Live price ticker** — an infinitely scrolling strip under the navbar showing every product's emoji, price per unit and ▲/▼ change. It pauses on hover.
2. **🔺🔻 Risers & fallers** — the home page highlights the top 6 products whose price rose today and the top 6 whose price fell, with red ▲ / green ▼ / gray — badges.
3. **🗂️ Category browsing with numeric sort** — filter by চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ and মসলা. Sort by default, price low→high or high→low. Sorting uses real numbers, never Bengali text, so ৯৯ never lands after ১৪৮.
4. **🔐 Authentication with Better Auth** — email & password sign up / sign in plus Google and GitHub social login, with toast feedback and validation errors.
5. **🛡️ Protected product details** — every product has a page with min / max / average price and a table of prices across 12 bazars in 6 divisions. Only logged-in users can open it; others are redirected to sign in with a toast.
6. **👤 Profile & update name** — a profile page with a dedicated route to update your display name.
7. **📱 Fully responsive & polished UX** — mobile, tablet and desktop layouts, skeleton loaders while data loads, friendly 404 and empty states, and Bangla date and numerals throughout.

---

## 🛠️ Technologies Used

| Purpose | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 + [DaisyUI](https://daisyui.com/) 5 |
| Authentication | [Better Auth](https://better-auth.com/) (email/password, Google, GitHub) |
| Database | MongoDB Atlas (users, sessions, accounts) |
| Notifications | react-hot-toast |
| Font | Hind Siliguri (via `next/font`) |
| Data | Programming Hero BazarDor REST API |
| Deployment | Vercel |
