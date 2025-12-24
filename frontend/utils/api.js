// Backend API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';


/**
 * Upload a PDF file to the backend
 * @param {File} file - The PDF file to upload
 * @returns {Promise<Object>} Response containing status, valid_documents, chunks_created
 */
export async function uploadPDF(file) {
    const formData = new FormData();
    formData.append('files', file);

    console.log('🔍 Upload Debug Info:');
    console.log('  - API URL:', API_BASE_URL);
    console.log('  - Full endpoint:', `${API_BASE_URL}/upload`);
    console.log('  - File name:', file.name);
    console.log('  - File size:', file.size, 'bytes');
    console.log('  - File type:', file.type);

    try {
        console.log('📤 Sending POST request to:', `${API_BASE_URL}/upload`);

        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        console.log('📥 Response received:');
        console.log('  - Status:', response.status);
        console.log('  - Status Text:', response.statusText);
        console.log('  - OK:', response.ok);

        if (!response.ok) {
            let errorMessage = 'Upload failed';
            try {
                const errorData = await response.json();
                console.error('❌ Error data:', errorData);
                errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
            } catch (e) {

                console.error('❌ Could not parse error response:', e);
                errorMessage = `Upload failed with status ${response.status}`;
            }
            throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log('✅ Upload successful:', result);
        return result;
    } catch (error) {
        console.error('💥 Upload error caught:', error);
        console.error('  - Error message:', error.message);
        console.error('  - Error stack:', error.stack);

        if (error.message) {
            throw error;
        }
        throw new Error(`Network error: ${error.toString()}`);
    }
}


/**
 * Ask a question using the RAG system
 * @param {string} query - The question to ask
 * @returns {Promise<Object>} Response containing answer and sources
 */
export async function askQuestion(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/ask?query=${encodeURIComponent(query)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            let errorMessage = 'Query failed';
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
            } catch (e) {
                errorMessage = `Query failed with status ${response.status}`;
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        if (error.message) {
            throw error;
        }
        throw new Error(`Network error: ${error.toString()}`);
    }
}

/**
 * Summarize uploaded documents
 * @param {string} mode - Summary mode: 'short', 'medium', or 'detailed'
 * @returns {Promise<Object>} Response containing the summary
 */
export async function summarizeContent(mode) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/summarize?mode=${encodeURIComponent(mode)}`,
            {
                method: 'POST',
            }
        );

        if (!response.ok) {
            let errorMessage = 'Summarization failed';
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
            } catch (e) {
                errorMessage = `Summarization failed with status ${response.status}`;
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        if (error.message) {
            throw error;
        }
        throw new Error(`Network error: ${error.toString()}`);
    }
}
