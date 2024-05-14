export function fileToBase64(file: File, callback: (base64String: string) => void): void {
    const reader = new FileReader();
    reader.onload = function(event) {
        if (typeof event.target?.result === 'string') {
            callback(event.target.result);
        }
    };
    reader.readAsDataURL(file);
}
