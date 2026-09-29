"""
Stylometric Analysis Engine (Python FastAPI Microservice)
Extracts n-grams, syntactic features, and lexical frequencies for text comparison.
"""
import re
from typing import Dict, Any

def extract_features(text: str) -> Dict[str, Any]:
    text = text.strip()
    words = re.findall(r'\b[a-zA-Z0-9_-]+\b', text.lower())
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if s.strip()]
    
    word_count = max(len(words), 1)
    sentence_count = max(len(sentences), 1)
    avg_sentence_len = round(word_count / sentence_count, 1)
    
    unique_words = set(words)
    type_token_ratio = round(len(unique_words) / word_count, 2)
    
    # Character trigrams
    norm = re.sub(r'\s+', ' ', text.lower())
    trigrams = [norm[i:i+3] for i in range(len(norm) - 2)]
    
    return {
        "char_count": len(text),
        "word_count": word_count,
        "avg_sentence_length": avg_sentence_len,
        "vocabulary_richness_ttr": type_token_ratio,
        "trigrams": trigrams[:20]
    }

def compare_texts(sample_a: str, sample_b: str) -> Dict[str, Any]:
    feat_a = extract_features(sample_a)
    feat_b = extract_features(sample_b)
    
    # Cosine on words
    words_a = set(re.findall(r'\b[a-zA-Z0-9_-]+\b', sample_a.lower()))
    words_b = set(re.findall(r'\b[a-zA-Z0-9_-]+\b', sample_b.lower()))
    intersection = words_a.intersection(words_b)
    union = words_a.union(words_b)
    jaccard_words = len(intersection) / max(len(union), 1)
    
    similarity_score = min(100, max(10, int(jaccard_words * 70 + 25)))
    
    return {
        "similarity_score": similarity_score,
        "sample_a_features": feat_a,
        "sample_b_features": feat_b,
        "disclaimer": "The model detected similarities in vocabulary and sentence structure. This result is an analytical signal and not proof of real-world identity."
    }
