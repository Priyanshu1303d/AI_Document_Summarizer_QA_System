// Backend API base URL
const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Upload a PDF file to the backend
 * @param {File} file - The PDF file to upload
 * @returns {Promise<Object>} Response containing status, valid_documents, chunks_created
 */
export async function uploadPDF(file) {
    const formData = new FormData();
    formData.append('files', file);

    try {
        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            let errorMessage = 'Upload failed';
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
            } catch (e) {
                errorMessage = `Upload failed with status ${response.status}`;
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        // If it's already our error, rethrow it
        if (error.message) {
            throw error;
        }
        // Network or other errors
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
 * Summarize document content
 * @param {string} content - The document content to summarize
 * @param {string} mode - Summary mode: 'short', 'medium', or 'detailed'
 * @returns {Promise<Object>} Response containing the summary
 */
export async function summarizeContent(content, mode) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/summarize?mode=${encodeURIComponent(mode)}&content=${encodeURIComponent(content)}`,
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
