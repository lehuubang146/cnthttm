import React from 'react';

const Home = ({ navigate }) => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
      
      <h1 style={{ fontSize: '3rem', color: '#111827', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-1px', lineHeight: '1.2' }}>
        Ôn Tập Hiệu Quả <br/>
        <span style={{ color: '#3b82f6' }}>Hệ Thống Thông Minh</span>
      </h1>
      
      <p style={{ fontSize: '1.15rem', color: '#4b5563', marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3rem auto', lineHeight: '1.7' }}>
        Nền tảng tổng hợp kiến thức và giải chi tiết các đề thi tự luận môn Các Nền Tảng Hệ Thống Thông Minh. Tích hợp hệ thống thi trắc nghiệm (Mock Exam) với giải thích cặn kẽ giúp bạn đạt điểm cao.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => navigate('Thi Thử (Mock Exam)')}
          style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Bắt đầu Thi Thử
        </button>
        
        <button 
          onClick={() => navigate('Giải Bài Đề 1')}
          style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: '#ffffff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Xem Giải Đề 1
        </button>

        <button 
          onClick={() => navigate('Giải Bài Đề 2')}
          style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: '#ffffff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Xem Giải Đề 2
        </button>
      </div>

      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '3rem' }}>
        <div>
          <h4 style={{ fontSize: '2rem', color: '#1f2937', margin: '0 0 0.5rem 0', fontWeight: '800' }}>2+</h4>
          <p style={{ margin: 0, color: '#6b7280', fontWeight: '500' }}>Đề tự luận có giải</p>
        </div>
        <div>
          <h4 style={{ fontSize: '2rem', color: '#1f2937', margin: '0 0 0.5rem 0', fontWeight: '800' }}>200+</h4>
          <p style={{ margin: 0, color: '#6b7280', fontWeight: '500' }}>Câu hỏi trắc nghiệm</p>
        </div>
        <div>
          <h4 style={{ fontSize: '2rem', color: '#1f2937', margin: '0 0 0.5rem 0', fontWeight: '800' }}>100%</h4>
          <p style={{ margin: 0, color: '#6b7280', fontWeight: '500' }}>Bám sát đề cương</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
