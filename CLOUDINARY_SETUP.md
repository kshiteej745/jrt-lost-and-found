# Cloudinary Setup Instructions

## Environment Variables

Add the following to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

You can find these values in your [Cloudinary Dashboard](https://console.cloudinary.com/).

## API Endpoint

**POST** `/api/upload`

### Request
- Content-Type: `multipart/form-data`
- Body: Form data with `file` field containing the image file

### Response (Success)
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "publicId": "lost-and-found/...",
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "size": 245678
}
```

### Response (Error)
```json
{
  "error": "Error message"
}
```

## Validation

- **File types**: PNG, JPG, JPEG, WebP only
- **Max file size**: 5MB
- **Upload folder**: `lost-and-found` (configurable in `lib/cloudinary.ts`)

## Usage Example

```typescript
const formData = new FormData()
formData.append('file', file)

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
})

const data = await response.json()
if (data.success) {
  console.log('Image URL:', data.url)
}
```

