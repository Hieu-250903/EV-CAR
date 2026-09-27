# AGENTS.md

Dự án: **EV-olution** — Website landing page / showroom online cho xe điện, xây dựng bằng React + Vite.

## Context

Đọc theo thứ tự:
1. `spec/README.md` — index + authority order
2. `spec/repo-config.md` — tech stack, scripts
3. `spec/conventions.md` — coding rules (BẮT BUỘC trước khi viết code)
4. `spec/.agent-skill.md` — capabilities, constraints, workflow

## Quick commands

| Mục đích | Lệnh |
|----------|------|
| Cài deps | `npm install` |
| Dev server | `npm run dev` (port 5173) |
| Build prod | `npm run build` |
| Lint | `npm run lint` |
| Preview build | `npm run preview` |

## Constraints

- KHÔNG commit secrets / `.env`
- KHÔNG force-push `main`
- KHÔNG thêm dependency mà không hỏi
- KHÔNG xóa hoặc rename component mà không cập nhật `App.jsx`
- Cập nhật `spec/changelog.md` sau mỗi thay đổi có ý nghĩa
