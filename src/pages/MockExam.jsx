import React, { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';
import { CheckCircle2, XCircle, Clock, ArrowRight, RotateCcw, Home, History, Trash2, Eye } from 'lucide-react';

const MockExam = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes by default
  const [isStarted, setIsStarted] = useState(false);
  const [history, setHistory] = useState([]);
  
  // Settings for the exam
  const [questionCount, setQuestionCount] = useState(10);
  const [examTime, setExamTime] = useState(15);
  
  // To identify if we are just viewing a past exam
  const [viewingHistory, setViewingHistory] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [hasActiveSession, setHasActiveSession] = useState(false);

  // Load history and check active session on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('cnttm_exam_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    
    const activeSession = localStorage.getItem('cnttm_exam_current_state');
    if (activeSession) {
      try {
        const parsed = JSON.parse(activeSession);
        if (parsed.endTime > Date.now()) {
          setHasActiveSession(true);
        } else {
          localStorage.removeItem('cnttm_exam_current_state');
        }
      } catch (e) {
        localStorage.removeItem('cnttm_exam_current_state');
      }
    }
  }, []);

  // Sync state to local storage when active
  useEffect(() => {
    if (isStarted && !isSubmitted && !viewingHistory && endTime) {
      const stateToSave = {
        questions,
        currentQIndex,
        selectedAnswers,
        endTime,
        questionCount,
        examTime
      };
      localStorage.setItem('cnttm_exam_current_state', JSON.stringify(stateToSave));
    }
    
    if (isSubmitted) {
      localStorage.removeItem('cnttm_exam_current_state');
    }
  }, [questions, currentQIndex, selectedAnswers, endTime, isStarted, isSubmitted, viewingHistory]);

  useEffect(() => {
    let timer;
    if (isStarted && !isSubmitted && !viewingHistory && endTime) {
      timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimeLeft(remaining);
        if (remaining === 0) {
          handleSubmit();
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, isSubmitted, viewingHistory, endTime]);

  const handleSelectOption = (optIndex) => {
    if (isSubmitted || viewingHistory) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQIndex]: optIndex
    });
  };

  const handleSubmit = () => {
    let currentScore = 0;
    // We need to use the current questions state to score
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setIsSubmitted(true);

    // Save history
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('vi-VN'),
      score: currentScore,
      total: questions.length,
      percentage: Math.round((currentScore / questions.length) * 100),
      questions: questions,
      selectedAnswers: selectedAnswers
    };
    const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep last 10
    setHistory(updatedHistory);
    localStorage.setItem('cnttm_exam_history', JSON.stringify(updatedHistory));
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    const eTimeSecs = examTime * 60;
    setTimeLeft(eTimeSecs);
    setEndTime(Date.now() + eTimeSecs * 1000);
    setViewingHistory(false);
    
    const availableQuestions = Math.min(questionCount, questionsData.length);
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random()).slice(0, availableQuestions);
    setQuestions(shuffled);
  };

  const handleGoHome = () => {
    setIsStarted(false);
    setIsSubmitted(false);
    setViewingHistory(false);
    
    // Check if we still have a valid session to show the resume button
    const activeSession = localStorage.getItem('cnttm_exam_current_state');
    if (activeSession) {
      try {
        const parsed = JSON.parse(activeSession);
        if (parsed.endTime > Date.now()) {
          setHasActiveSession(true);
        } else {
          setHasActiveSession(false);
          localStorage.removeItem('cnttm_exam_current_state');
        }
      } catch (e) {
        setHasActiveSession(false);
      }
    }
  };

  const handleViewHistory = (entry) => {
    setQuestions(entry.questions);
    setSelectedAnswers(entry.selectedAnswers);
    setScore(entry.score);
    setIsSubmitted(true);
    setIsStarted(true);
    setViewingHistory(true);
    setCurrentQIndex(0);
  };

  const handleDeleteHistoryEntry = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá kết quả này không?")) {
      const updated = history.filter(h => h.id !== id);
      setHistory(updated);
      localStorage.setItem('cnttm_exam_history', JSON.stringify(updated));
    }
  };

  const handleDeleteAllHistory = () => {
    if (window.confirm("CẢNH BÁO: Bạn có chắc chắn muốn xoá TOÀN BỘ lịch sử làm bài không? Hành động này không thể hoàn tác.")) {
      setHistory([]);
      localStorage.removeItem('cnttm_exam_history');
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isStarted) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>Kỳ Thi Thử CNTHTTM</h2>
          
          <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'inline-block', textAlign: 'left', marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Số lượng câu hỏi (1 - 200 câu):</label>
              <input 
                type="number" 
                min="1" 
                max="200" 
                value={questionCount} 
                onChange={(e) => setQuestionCount(e.target.value)} 
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '100%', maxWidth: '200px' }}
              />
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Tối thiểu: 1, Tối đa: 200</p>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Thời gian làm bài (phút):</label>
              <input 
                type="number" 
                min="1" 
                max="180" 
                value={examTime} 
                onChange={(e) => setExamTime(e.target.value)} 
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '100%', maxWidth: '200px' }}
              />
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Tối thiểu: 1 phút, Tối đa: 180 phút (3 tiếng)</p>
            </div>
          </div>
          <br/>
          
          {hasActiveSession && (
            <button 
              onClick={() => {
                const activeSession = JSON.parse(localStorage.getItem('cnttm_exam_current_state'));
                setQuestions(activeSession.questions);
                setCurrentQIndex(activeSession.currentQIndex);
                setSelectedAnswers(activeSession.selectedAnswers);
                setEndTime(activeSession.endTime);
                setTimeLeft(Math.max(0, Math.floor((activeSession.endTime - Date.now()) / 1000)));
                setQuestionCount(activeSession.questionCount || 10);
                setExamTime(activeSession.examTime || 15);
                setIsStarted(true);
                setHasActiveSession(false);
              }}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1.1rem',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3)',
                marginRight: '1rem',
                marginBottom: '1rem'
              }}
            >
              Tiếp tục bài làm dở
            </button>
          )}

          <button 
            onClick={() => {
              let qCount = parseInt(questionCount, 10);
              let eTime = parseInt(examTime, 10);
              
              if (isNaN(qCount) || qCount < 1) qCount = 1;
              if (qCount > 200) qCount = 200;
              
              if (isNaN(eTime) || eTime < 1) eTime = 1;
              if (eTime > 180) eTime = 180;

              setQuestionCount(qCount);
              setExamTime(eTime);
              
              const eTimeSecs = eTime * 60;
              setTimeLeft(eTimeSecs);
              setEndTime(Date.now() + eTimeSecs * 1000);

              const availableQuestions = Math.min(qCount, questionsData.length);
              const shuffled = [...questionsData].sort(() => 0.5 - Math.random()).slice(0, availableQuestions);
              setQuestions(shuffled);
              setCurrentQIndex(0);
              setSelectedAnswers({});
              setIsStarted(true);
              setHasActiveSession(false);
            }}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
            }}
          >
            Bắt đầu làm bài
          </button>
        </div>

        {history.length > 0 && (
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', margin: 0, color: '#374151' }}>
                <History size={20} /> Lịch sử làm bài
              </h3>
              <button 
                onClick={handleDeleteAllHistory}
                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem', backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #f87171', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
              >
                <Trash2 size={16} /> Xóa tất cả
              </button>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '0.75rem', color: '#4b5563', fontWeight: '600' }}>Thời gian</th>
                    <th style={{ padding: '0.75rem', color: '#4b5563', fontWeight: '600' }}>Điểm số</th>
                    <th style={{ padding: '0.75rem', color: '#4b5563', fontWeight: '600' }}>Tỷ lệ</th>
                    <th style={{ padding: '0.75rem', color: '#4b5563', fontWeight: '600', textAlign: 'right' }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry) => (
                    <tr key={entry.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '0.75rem', color: '#374151' }}>{entry.date}</td>
                      <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: '500' }}>{entry.score} / {entry.total}</td>
                      <td style={{ padding: '0.75rem', color: '#3b82f6', fontWeight: '500' }}>{entry.percentage}%</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button 
                            onClick={() => handleViewHistory(entry)}
                            title="Xem lại bài làm"
                            style={{ padding: '0.4rem', backgroundColor: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe', borderRadius: '4px', cursor: 'pointer', display: 'flex' }}
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteHistoryEntry(entry.id)}
                            title="Xóa kết quả"
                            style={{ padding: '0.4rem', backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer', display: 'flex' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={handleGoHome} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }} title="Tạm dừng và về màn hình chính">
            <Home size={24} />
          </button>
          {viewingHistory ? 'Xem Lại Bài Thi' : 'Thi Thử (Mock Exam)'}
        </h2>
        
        {!viewingHistory && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: timeLeft < 60 ? '#ef4444' : '#3b82f6' }}>
            <Clock size={24} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {isSubmitted && !viewingHistory && (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#166534', marginBottom: '0.5rem' }}>Kết Quả Của Bạn</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#15803d' }}>{score} / {questions.length}</p>
          <p style={{ color: '#166534', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Tỷ lệ chính xác: {Math.round((score / questions.length) * 100)}%</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button 
              onClick={handleGoHome}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#fff', border: '1px solid #d1d5db', color: '#4b5563', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              <Home size={18} /> Về trang bắt đầu
            </button>
            <button 
              onClick={handleRestart}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#fff', border: '1px solid #22c55e', color: '#15803d', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              <RotateCcw size={18} /> Làm lại bài thi
            </button>
          </div>
        </div>
      )}

      {viewingHistory && (
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Điểm số: <span style={{ color: '#059669', fontSize: '1.25rem' }}>{score} / {questions.length}</span></h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>Bạn đang trong chế độ xem lại bài đã làm.</p>
          </div>
          <button 
            onClick={handleGoHome}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
          >
            <Home size={16} /> Về trang bắt đầu
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {questions.map((q, idx) => {
          let btnBg = currentQIndex === idx ? '#eff6ff' : (selectedAnswers[idx] !== undefined ? '#f3f4f6' : 'white');
          let btnBorder = currentQIndex === idx ? '#3b82f6' : '#e5e7eb';
          let btnColor = currentQIndex === idx ? '#2563eb' : '#4b5563';

          if (isSubmitted) {
            const isCorrect = q.answer === selectedAnswers[idx];
            if (selectedAnswers[idx] !== undefined) {
               if (isCorrect) {
                  btnBg = currentQIndex === idx ? '#dcfce7' : '#f0fdf4';
                  btnBorder = currentQIndex === idx ? '#16a34a' : '#bbf7d0';
                  btnColor = '#166534';
               } else {
                  btnBg = currentQIndex === idx ? '#fee2e2' : '#fef2f2';
                  btnBorder = currentQIndex === idx ? '#dc2626' : '#fecaca';
                  btnColor = '#991b1b';
               }
            } else {
               btnBorder = currentQIndex === idx ? '#6b7280' : '#e5e7eb';
               btnColor = currentQIndex === idx ? '#374151' : '#9ca3af';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => setCurrentQIndex(idx)}
              style={{
                width: '36px', height: '36px',
                borderRadius: '6px',
                border: `1px solid ${btnBorder}`,
                backgroundColor: btnBg,
                color: btnColor,
                cursor: 'pointer',
                fontWeight: currentQIndex === idx ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >
              {idx + 1}
            </button>
          )
        })}
      </div>

      {currentQ && (
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', color: '#4b5563', fontWeight: '500' }}>
              {currentQ.chapter}
            </span>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Câu {currentQIndex + 1} / {questions.length}</span>
          </div>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#111827', lineHeight: '1.5' }}>
            {currentQ.question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentQ.options.map((opt, optIndex) => {
              const isSelected = selectedAnswers[currentQIndex] === optIndex;
              const isCorrect = currentQ.answer === optIndex;
              
              let borderCol = isSelected ? '#3b82f6' : '#e5e7eb';
              let bgCol = isSelected ? '#eff6ff' : 'white';
              let icon = null;

              if (isSubmitted) {
                if (isCorrect) {
                  borderCol = '#22c55e';
                  bgCol = '#f0fdf4';
                  icon = <CheckCircle2 color="#22c55e" size={20} />;
                } else if (isSelected && !isCorrect) {
                  borderCol = '#ef4444';
                  bgCol = '#fef2f2';
                  icon = <XCircle color="#ef4444" size={20} />;
                } else {
                  borderCol = '#e5e7eb';
                  bgCol = 'white';
                }
              }

              return (
                <button
                  key={optIndex}
                  onClick={() => handleSelectOption(optIndex)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '1rem 1.5rem',
                    textAlign: 'left',
                    backgroundColor: bgCol,
                    border: `2px solid ${borderCol}`,
                    borderRadius: '8px',
                    cursor: (isSubmitted || viewingHistory) ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    color: '#374151',
                    fontSize: '1rem'
                  }}
                >
                  <span>{String.fromCharCode(65 + optIndex)}. {opt}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Giải thích:</h4>
              <p style={{ margin: 0, color: '#475569' }}>{currentQ.explanation}</p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
            <button 
              onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
              disabled={currentQIndex === 0}
              style={{
                padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white',
                color: currentQIndex === 0 ? '#9ca3af' : '#4b5563', cursor: currentQIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Câu trước
            </button>
            
            {!isSubmitted && currentQIndex === questions.length - 1 ? (
              <button 
                onClick={handleSubmit}
                style={{
                  padding: '0.5rem 1.5rem', borderRadius: '6px', border: 'none', backgroundColor: '#3b82f6',
                  color: 'white', cursor: 'pointer', fontWeight: '600'
                }}
              >
                Nộp bài
              </button>
            ) : (
              <button 
                onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
                disabled={currentQIndex === questions.length - 1}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white',
                  color: currentQIndex === questions.length - 1 ? '#9ca3af' : '#4b5563', cursor: currentQIndex === questions.length - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Câu tiếp <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MockExam;
