import React from 'react';

const SolutionDe2 = () => {
  const examBoxStyle = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '2rem',
    fontSize: '0.95rem',
    color: '#334155'
  };

  const solutionBlock = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px dashed #cbd5e1',
    marginBottom: '1.5rem',
    lineHeight: '1.8'
  };

  const codeStyle = {
    backgroundColor: '#f1f5f9',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontFamily: 'monospace',
    color: '#0f172a',
    fontWeight: '500'
  };

  return (
    <div>
      <h2>Giải Đề Ôn Tập Số 2</h2>
      
      <section style={{ marginTop: '2rem' }}>
        <h3>Câu 1: Thuật toán k-Nearest Neighbors (kNN)</h3>
        
        {/* ĐỀ BÀI CÂU 1 */}
        <div style={examBoxStyle}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>ĐỀ BÀI (2 ĐIỂM)</h4>
          <p>Một ứng dụng giao đồ ăn muốn dự đoán xem một khách hàng có quyết định đặt mua gói giao hàng tháng Freeship (Subscribe: Yes/No) hay không. Dữ liệu lịch sử gồm 6 khách hàng với hai thuộc tính số: Số đơn hàng đã đặt (Orders) và Số tiền giảm giá trung bình nhận được (Discount - nghìn đồng).</p>
          <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '0.5rem' }}>Khách hàng</th>
                <th style={{ padding: '0.5rem' }}>Orders</th>
                <th style={{ padding: '0.5rem' }}>Discount</th>
                <th style={{ padding: '0.5rem' }}>Subscribe</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '0.5rem' }}>KH1</td><td style={{ padding: '0.5rem' }}>5</td><td style={{ padding: '0.5rem' }}>10</td><td style={{ padding: '0.5rem' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH2</td><td style={{ padding: '0.5rem' }}>25</td><td style={{ padding: '0.5rem' }}>40</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH3</td><td style={{ padding: '0.5rem' }}>10</td><td style={{ padding: '0.5rem' }}>20</td><td style={{ padding: '0.5rem' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH4</td><td style={{ padding: '0.5rem' }}>20</td><td style={{ padding: '0.5rem' }}>50</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH5</td><td style={{ padding: '0.5rem' }}>5</td><td style={{ padding: '0.5rem' }}>30</td><td style={{ padding: '0.5rem' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH6</td><td style={{ padding: '0.5rem' }}>30</td><td style={{ padding: '0.5rem' }}>20</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
            </tbody>
          </table>
          <p>Một khách hàng mới P có thông tin: P = (Orders = 15, Discount = 30).</p>
        </div>

        <h4>BÀI GIẢI NHANH (Trình bày ra giấy)</h4>
        
        <div style={solutionBlock}>
          <p><strong>1. Tiền xử lý dữ liệu (Min-Max Scaling)</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>Khách hàng mới P = (15, 30)</li>
            <li>• Thuộc tính Orders (O): <span style={codeStyle}>Min = 5, Max = 30</span> → Chuẩn hóa P_O = (15 - 5) / (30 - 5) = 10/25 = <strong>0.4</strong></li>
            <li>• Thuộc tính Discount (D): <span style={codeStyle}>Min = 10, Max = 50</span> → Chuẩn hóa P_D = (30 - 10) / (50 - 10) = 20/40 = <strong>0.5</strong></li>
            <li style={{ marginTop: '0.5rem', color: '#059669', fontWeight: '500' }}>→ P mới (sau chuẩn hóa) = (0.4, 0.5)</li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>2. Bảng chuẩn hóa dữ liệu & Tính toán khoảng cách (Manhattan)</strong></p>
          <p style={{ paddingLeft: '1rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>Công thức khoảng cách: <span style={codeStyle}>d = |x1 - x2| + |y1 - y2|</span></p>
          <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #e2e8f0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1', backgroundColor: '#f1f5f9' }}>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Khách hàng</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Orders (Min-Max)</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Discount (Min-Max)</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Khoảng cách d (so với P)</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Hạng</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Subscribe</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>KH1</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.0</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.0</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.9</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>6</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>KH2</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.8</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.75</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.65</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>3</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f0fdf4' }}><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>KH3</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.2</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.25</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#16a34a' }}>0.45</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>2</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>KH4</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.6</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>1.0</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.7</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>4</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f0fdf4' }}><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>KH5</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.0</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.5</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#16a34a' }}>0.4</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>1</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>KH6</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>1.0</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.25</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>0.85</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>5</td><td style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Yes</td></tr>
            </tbody>
          </table>

          <p style={{ marginTop: '1.5rem' }}><strong>3. Phân lớp</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>• <strong>Với k = 3:</strong> 3 láng giềng gần nhất là KH5(No), KH3(No), KH2(Yes).<br/>→ Tỷ số: No(2) &gt; Yes(1). <strong>Kết luận: No</strong>.</li>
            <li>• <strong>Với k = 5:</strong> 5 láng giềng gần nhất là KH5(No), KH3(No), KH2(Yes), KH4(Yes), KH6(Yes).<br/>→ Tỷ số: Yes(3) &gt; No(2). <strong>Kết luận: Yes</strong>.</li>
          </ul>

          <details style={{ marginTop: '1.5rem', backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💡 Xem giải thích chi tiết Câu 1
            </summary>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
               <p><strong>1. Tại sao phải chuẩn hóa Min-Max Scaling?</strong><br/>Khoảng cách Manhattan rất nhạy cảm với sự chênh lệch đơn vị. Nếu cột <code>Discount</code> lớn hơn hẳn cột <code>Orders</code>, thuật toán sẽ bị thiên vị. Chuẩn hóa Min-Max đưa tất cả về khoảng từ 0 đến 1, giúp hai cột có tiếng nói ngang bằng nhau.</p>
               <p><strong>2. Công thức Min-Max là gì?</strong><br/><code>P_mới = (P - Min) / (Max - Min)</code>. Ở cột Orders, bé nhất là 5, lớn nhất là 30. Vậy khách hàng mới P (có 15 đơn) sẽ được chuẩn hóa thành <code>(15 - 5) / (30 - 5) = 10 / 25 = 0.4</code>.</p>
               <p><strong>3. Công thức khoảng cách Manhattan (City Block):</strong><br/><code>d = |x1 - x2| + |y1 - y2|</code>. Khác với Euclidean (đường chim bay), Manhattan tính khoảng cách theo dạng lưới (như đi đường trong thành phố). Bạn lấy trị tuyệt đối hiệu của từng thuộc tính rồi cộng lại.</p>
               <p><strong>4. Xác định Hạng như thế nào?</strong><br/>Sau khi tính khoảng cách từ P đến 6 KH, bạn sắp xếp khoảng cách từ NHỎ NHẤT đến LỚN NHẤT (0.4 → 0.45 → 0.65 → 0.7 → 0.85 → 0.9) để đánh hạng từ 1 đến 6. KH5 có khoảng cách nhỏ nhất nên xếp hạng 1 (Gần nhất).</p>
               <p><strong>5. Phân lớp (Voting):</strong><br/>- k=3: Chọn 3 người hạng cao nhất (Hạng 1, 2, 3), đếm xem Yes hay No nhiều hơn. Ở đây 3 người đó có nhãn là No, No, Yes → Số lượng No (2) &gt; Yes (1), nên P mang nhãn No.<br/>- k=5: Chọn 5 người hạng cao nhất, đếm xem Yes hay No nhiều hơn. Ở đây có 3 Yes, 2 No, nên P mang nhãn Yes.</p>
            </div>
          </details>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h3>Câu 2: Cây quyết định (Decision Tree)</h3>
        
        {/* ĐỀ BÀI CÂU 2 */}
        <div style={examBoxStyle}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>ĐỀ BÀI (2 ĐIỂM)</h4>
          <p>Dữ liệu hồ sơ yêu cầu bồi thường tai nạn có dấu hiệu gian lận (Fraud: yes/no). 8 hồ sơ với hai thuộc tính: Vehicle_Type và Time_Of_Day.</p>
          <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '0.5rem' }}>Hồ sơ</th>
                <th style={{ padding: '0.5rem' }}>Vehicle_Type</th>
                <th style={{ padding: '0.5rem' }}>Time_Of_Day</th>
                <th style={{ padding: '0.5rem' }}>Fraud</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '0.5rem' }}>HS1</td><td style={{ padding: '0.5rem' }}>Luxury</td><td style={{ padding: '0.5rem' }}>Night</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>HS2</td><td style={{ padding: '0.5rem' }}>Standard</td><td style={{ padding: '0.5rem' }}>Day</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>HS3</td><td style={{ padding: '0.5rem' }}>Luxury</td><td style={{ padding: '0.5rem' }}>Day</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>HS4</td><td style={{ padding: '0.5rem' }}>Luxury</td><td style={{ padding: '0.5rem' }}>Night</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>HS5</td><td style={{ padding: '0.5rem' }}>Standard</td><td style={{ padding: '0.5rem' }}>Night</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>HS6</td><td style={{ padding: '0.5rem' }}>Luxury</td><td style={{ padding: '0.5rem' }}>Night</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>HS7</td><td style={{ padding: '0.5rem' }}>Standard</td><td style={{ padding: '0.5rem' }}>Day</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>HS8</td><td style={{ padding: '0.5rem' }}>Standard</td><td style={{ padding: '0.5rem' }}>Night</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
            </tbody>
          </table>
        </div>

        <h4>BÀI GIẢI NHANH (Trình bày ra giấy)</h4>
        
        <div style={solutionBlock}>
          <p><strong>1. Tính Entropy toàn cục</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>Tổng cộng có 8 mẫu: 4 Yes, 4 No.</li>
            <li>• <span style={codeStyle}>Entropy(D) = - (4/8)*log2(4/8) - (4/8)*log2(4/8) = 1.0</span></li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>2. Tính Information Gain</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li><strong>* Xét thuộc tính Vehicle_Type:</strong></li>
            <li>• Nhánh Luxury: 4 mẫu (3 Yes, 1 No) → <span style={codeStyle}>Entropy = 0.8113</span></li>
            <li>• Nhánh Standard: 4 mẫu (1 Yes, 3 No) → <span style={codeStyle}>Entropy = 0.8113</span></li>
            <li style={{ color: '#2563eb', fontWeight: '500' }}>→ Gain(Vehicle) = 1.0 - [(4/8)*0.8113 + (4/8)*0.8113] = 1.0 - 0.8113 = 0.1887</li>
            
            <li style={{ marginTop: '1rem' }}><strong>* Xét thuộc tính Time_Of_Day:</strong></li>
            <li>• Nhánh Night: 5 mẫu (4 Yes, 1 No) → <span style={codeStyle}>Entropy = -(4/5)*log2(4/5) - (1/5)*log2(1/5) = 0.7219</span></li>
            <li>• Nhánh Day: 3 mẫu (0 Yes, 3 No) → <span style={codeStyle}>Entropy = 0</span></li>
            <li style={{ color: '#2563eb', fontWeight: '500' }}>→ Gain(Time) = 1.0 - [(5/8)*0.7219 + (3/8)*0] = 1.0 - 0.4512 = 0.5488</li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>3. Phân nhánh cây</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>• Vì Gain(Time_Of_Day) &gt; Gain(Vehicle_Type), chọn <strong>Time_Of_Day</strong> làm nút gốc.</li>
            <li>• <strong>Sơ đồ cây:</strong></li>
          </ul>

          {/* Sơ đồ cây bằng CSS */}
          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem 0', overflowX: 'auto' }}>
            <div style={{ display: 'inline-block', minWidth: '300px' }}>
              
              {/* Nút Gốc */}
              <div style={{ display: 'inline-block', padding: '10px 20px', border: '2px solid #3b82f6', borderRadius: '8px', fontWeight: 'bold', backgroundColor: '#eff6ff', color: '#1e3a8a', position: 'relative', zIndex: 2 }}>
                Time_Of_Day
              </div>
              
              {/* Cành cây & Nút con */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', position: 'relative' }}>
                
                {/* Đường vẽ SVG */}
                <svg style={{ position: 'absolute', top: '-2.5rem', left: 0, width: '100%', height: '2.5rem', zIndex: 1 }} preserveAspectRatio="none">
                  <line x1="50%" y1="0" x2="25%" y2="100%" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="50%" y1="0" x2="75%" y2="100%" stroke="#94a3b8" strokeWidth="2" />
                </svg>

                {/* Nhánh trái */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
                  <span style={{ fontSize: '0.85rem', color: '#475569', backgroundColor: 'white', padding: '2px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '10px', zIndex: 2 }}>Day</span>
                  <div style={{ padding: '10px 20px', border: '2px solid #22c55e', borderRadius: '8px', fontWeight: 'bold', backgroundColor: '#f0fdf4', color: '#14532d', zIndex: 2, minWidth: '120px' }}>
                    Nút lá: NO<br/>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(3 mẫu)</span>
                  </div>
                </div>

                {/* Nhánh phải */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
                  <span style={{ fontSize: '0.85rem', color: '#475569', backgroundColor: 'white', padding: '2px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '10px', zIndex: 2 }}>Night</span>
                  <div style={{ padding: '10px 20px', border: '2px solid #f59e0b', borderRadius: '8px', fontWeight: 'bold', backgroundColor: '#fffbeb', color: '#78350f', zIndex: 2, minWidth: '120px' }}>
                    Vehicle_Type?<br/>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(5 mẫu)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <details style={{ marginTop: '1.5rem', backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💡 Xem giải thích chi tiết Câu 2
            </summary>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
               <p><strong>1. Tại sao phải tính Entropy?</strong><br/>Entropy là thước đo sự "hỗn loạn" hay "không chắc chắn" của dữ liệu. Nếu 50% Yes và 50% No (cực kỳ lộn xộn), Entropy = 1. Nếu tất cả đều là Yes hoặc tất cả đều là No (tinh khiết), Entropy = 0.<br/>Công thức: <code>-p(yes)*log2(p(yes)) - p(no)*log2(p(no))</code>. Tập dữ liệu S ban đầu có 4 Yes và 4 No nên Entropy(D) bằng đúng 1.0.</p>
               <p><strong>2. Tại sao dùng Information Gain (Độ lợi thông tin)?</strong><br/>Thuật toán cần biết nên dùng cột nào để làm câu hỏi chia nhánh đầu tiên (Nút gốc). Cột nào giúp tách tập dữ liệu lộn xộn ban đầu thành các nhóm con "tinh khiết" (ít lộn xộn) nhất sẽ có Information Gain lớn nhất.<br/><code>Gain = Entropy(ban đầu) - Entropy(sau khi chia bằng thuộc tính đó)</code>.</p>
               <p><strong>3. Tại sao chọn Time_Of_Day làm nút gốc?</strong><br/>Khi tính Information Gain, ta thấy <code>Gain(Time_Of_Day) = 0.5488</code> lớn hơn <code>Gain(Vehicle_Type) = 0.1887</code>. Điều này chứng tỏ khi chia dữ liệu theo ngày và đêm, tập dữ liệu thu được tinh khiết hơn rất nhiều so với chia theo loại hình phương tiện. Do đó, Time_Of_Day được chọn làm nút gốc của cây.</p>
               <p><strong>4. Tại sao lại vẽ sơ đồ cây như thế kia?</strong><br/>Từ Nút gốc (Time_Of_Day), ta chẻ ra 2 nhánh là Day và Night. Ở nhánh Day, ta thấy có 3 mẫu và cả 3 đều là No, tập con này đã thuần nhất 100% (Entropy=0), nên ta đưa ra kết luận ngay (Lá = NO). Ở nhánh Night, dữ liệu vẫn còn lộn xộn (4 Yes, 1 No) nên ta phải ghi rõ cần đặt thêm câu hỏi phụ (Vehicle_Type?) để tiếp tục phân loại.</p>
            </div>
          </details>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h3>Câu 3: Naive Bayes</h3>
        
        {/* ĐỀ BÀI CÂU 3 */}
        <div style={examBoxStyle}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>ĐỀ BÀI (2 ĐIỂM)</h4>
          <p>Mô hình Gaussian Naive Bayes phân loại giao dịch (Is_Spam: yes/no). Dữ liệu huấn luyện gồm thuộc tính Vị trí đăng nhập (Location) và Số tiền giao dịch (Amount).</p>
          <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '0.5rem' }}>Giao dịch</th>
                <th style={{ padding: '0.5rem' }}>Location</th>
                <th style={{ padding: '0.5rem' }}>Amount</th>
                <th style={{ padding: '0.5rem' }}>Is_Spam (Y)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '0.5rem' }}>GD1</td><td style={{ padding: '0.5rem' }}>Domestic</td><td style={{ padding: '0.5rem' }}>5</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>GD2</td><td style={{ padding: '0.5rem' }}>Foreign</td><td style={{ padding: '0.5rem' }}>45</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>GD3</td><td style={{ padding: '0.5rem' }}>Foreign</td><td style={{ padding: '0.5rem' }}>15</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>GD4</td><td style={{ padding: '0.5rem' }}>Domestic</td><td style={{ padding: '0.5rem' }}>55</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>GD5</td><td style={{ padding: '0.5rem' }}>Domestic</td><td style={{ padding: '0.5rem' }}>10</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>GD6</td><td style={{ padding: '0.5rem' }}>Foreign</td><td style={{ padding: '0.5rem' }}>65</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
            </tbody>
          </table>
          <p>Một giao dịch mới phát sinh Q có thông tin: Q = (Location = Foreign, Amount = 30).</p>
        </div>

        <h4>BÀI GIẢI NHANH (Trình bày ra giấy)</h4>
        
        <div style={solutionBlock}>
          <p><strong>1. Thống kê tham số</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>• Xác suất tiền nghiệm: <span style={codeStyle}>P(Yes) = 3/6 = 0.5</span> | <span style={codeStyle}>P(No) = 3/6 = 0.5</span></li>
            
            <li style={{ marginTop: '0.5rem' }}><strong>* Xét nhãn lớp YES:</strong></li>
            <li>• Xác suất Location (Foreign): <span style={codeStyle}>P(Foreign|Yes) = 2/3</span></li>
            <li>• Amount (Mean μ): <span style={codeStyle}>μ_yes = (45 + 55 + 65) / 3 = 55</span></li>
            <li>• Amount (Phương sai mẫu σ² chia n-1): <span style={codeStyle}>σ²_yes = ((45-55)² + (55-55)² + (65-55)²) / (3-1) = 200 / 2 = 100</span></li>
            <li>• Amount (Std Dev σ): <span style={codeStyle}>σ_yes = √100 = 10</span></li>
            
            <li style={{ marginTop: '0.5rem' }}><strong>* Xét nhãn lớp NO:</strong></li>
            <li>• Xác suất Location (Foreign): <span style={codeStyle}>P(Foreign|No) = 1/3</span></li>
            <li>• Amount (Mean μ): <span style={codeStyle}>μ_no = (5 + 15 + 10) / 3 = 10</span></li>
            <li>• Amount (Phương sai mẫu σ² chia n-1): <span style={codeStyle}>σ²_no = ((5-10)² + (15-10)² + (10-10)²) / (3-1) = 50 / 2 = 25</span></li>
            <li>• Amount (Std Dev σ): <span style={codeStyle}>σ_no = √25 = 5</span></li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>2. Tính Likelihood cho giao dịch Q(Foreign, 30)</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li><i>(Áp dụng hàm mật độ xác suất Gauss cho P(Amount=30))</i></li>
            <li>• <span style={codeStyle}>P(30|μ=55, σ=10) = (1 / 10√2π) × e^(-(30-55)² / 2×100) ≈ 0.00175</span></li>
            <li>• <span style={codeStyle}>P(30|μ=10, σ=5) = (1 / 5√2π) × e^(-(30-10)² / 2×25) ≈ 0.000027</span></li>
            <li style={{ marginTop: '0.5rem' }}>• <strong>Likelihood(Yes)</strong> = P(Yes) × P(Foreign|Yes) × P(30|Yes)<br/>   = 0.5 × (2/3) × 0.00175 = <strong>0.000583</strong></li>
            <li>• <strong>Likelihood(No)</strong> = P(No) × P(Foreign|No) × P(30|No)<br/>   = 0.5 × (1/3) × 0.000027 = <strong>0.0000045</strong></li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>3. Kết luận</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>Tổng = 0.000583 + 0.0000045 = 0.0005875</li>
            <li>• Xác suất Yes: 0.000583 / 0.0005875 ≈ <strong>99.23%</strong></li>
            <li>• Xác suất No: 0.0000045 / 0.0005875 ≈ <strong>0.77%</strong></li>
            <li style={{ marginTop: '0.5rem', color: '#2563eb', fontWeight: 'bold' }}>→ Phán quyết: YES (Giao dịch lừa đảo)</li>
          </ul>

          <details style={{ marginTop: '1.5rem', backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💡 Xem giải thích chi tiết Câu 3
            </summary>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
               <p><strong>1. Tại sao dùng phân phối Gauss cho Amount?</strong><br/>Vì <code>Amount</code> là số tiền (một biến số thực liên tục), ta không thể đếm tỷ lệ xuất hiện chính xác của một giá trị cụ thể như 30 giống như cách ta đếm các cột chữ (Local/Foreign). Thay vào đó, ta giả sử Amount tuân theo quy luật phân phối chuẩn (đường cong hình quả chuông). Để vẽ được cái chuông đó, ta cần tính Trung bình (μ) và Độ lệch chuẩn (σ) của nhóm Yes và nhóm No.</p>
               <p><strong>2. Tại sao lại phân 2 nhóm để tính?</strong><br/>Thuật toán Naive Bayes hoạt động bằng cách xem xét "Nếu đây là một giao dịch lừa đảo (Yes), thì nó thường có số tiền và địa điểm như thế nào?". Ta lấy riêng những giao dịch Yes ra để tính xem điểm trung bình của nhóm này là bao nhiêu (μ_yes = 55), và độ biến động là bao nhiêu (σ_yes = 10). Ta làm tương tự với nhóm Không lừa đảo (No).</p>
               <p><strong>3. Độ khả dĩ (Likelihood) ở đây nói lên điều gì?</strong><br/>Khi khách hàng Q có giao dịch ở mức 30, ta thấy số 30 nằm gần với trung bình của nhóm lừa đảo (55) hơn là nhóm không lừa đảo (10). Do đó, khi tính bằng hàm Gauss, xác suất rơi vào nhóm Yes (0.00175) cao hơn rất nhiều so với nhóm No (0.000027). Kết hợp thêm với yếu tố địa điểm Foreign, Likelihood của Yes ra cao vượt trội.</p>
               <p><strong>4. Bước chuẩn hóa cuối cùng:</strong><br/>Xác suất thô (Likelihood) không bao giờ cộng lại bằng 1. Để ra được tỷ lệ phần trăm dễ hiểu, ta lấy từng số chia cho tổng hai số. Kết quả 99.23% là một lời khẳng định cực kỳ đanh thép của mô hình thuật toán rằng giao dịch này chắc chắn là lừa đảo (YES).</p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};

export default SolutionDe2;