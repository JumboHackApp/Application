# Database Schema

## Users Collection
Document ID: `auth.currentUser.uid`

### Authentication Fields
- `email` (string) - User's email address
- `createdAt` (timestamp) - Account creation date
- `lastLogin` (timestamp) - Last login date

### Profile Fields
- `name` (string) - User's full name
- `university` (string) - User's university
- `photoURL` (string) - URL to profile picture in Firebase Storage
- `blurb` (string) - About me / bio
- `updatedAt` (timestamp) - Last profile update

### Questionnaire Fields
- `schoolEmail` (string) - Academic email address
- `graduationYear` (string) - Expected graduation year
- `major` (string) - Field of study
- `workPreferences` (object)
  - `preferredWork` (string) - Remote/On-site/Hybrid
  - `jobLocation` (string) - On-campus/Industry
  - `jobType` (string) - Internship/Full-time
- `interests` (array) - Array of interest keywords [max 7]

### Job Matching Fields
- `resumeText` (string) - Parsed resume text
- `jobPreferences` (object)
  - `desiredLocation` (string)
  - `desiredRole` (string)
  - `desiredIndustry` (string)

### System Fields
- `isProfileComplete` (boolean) - Whether user has completed initial setup
- `questionnaireComplete` (boolean) - Whether user has completed job questionnaire
- `accountStatus` (string) - Active/Inactive/Suspended

## Storage Rules
- Profile pictures stored at: `profile-pictures/{userId}`
- Max file size: 1MB
- Allowed formats: JPEG, PNG, WebP
- Required dimensions: 1024x1024