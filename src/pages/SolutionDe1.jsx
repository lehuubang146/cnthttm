import React from 'react';

const SolutionDe1 = () => {
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
    <div style={{ padding: '2rem 0' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1f2937', textAlign: 'center' }}>
        HƯỚNG DẪN GIẢI CHI TIẾT - ĐỀ 1
      </h2>
      
      <section style={{ marginTop: '2rem' }}>
        <h3>Câu 1: Thuật toán k-Nearest Neighbors (kNN)</h3>
        
        {/* ĐỀ BÀI CÂU 1 */}
        <div style={examBoxStyle}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>ĐỀ BÀI (2 ĐIỂM)</h4>
          <p>Một trung tâm thể hình muốn dự đoán một khách hàng hiện tại có gia hạn gói thành viên VIP (VIP_Renewal: Yes/No) hay không. Dữ liệu huấn luyện lịch sử gồm 6 khách hàng với hai thuộc tính số: Số tháng đã gắn bó (Months) và Số giờ tập trung bình mỗi tuần (Weekly_Hours).</p>
          <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '0.5rem' }}>Khách hàng</th>
                <th style={{ padding: '0.5rem' }}>Months</th>
                <th style={{ padding: '0.5rem' }}>Weekly_Hours</th>
                <th style={{ padding: '0.5rem' }}>VIP_Renewal</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '0.5rem' }}>KH1</td><td style={{ padding: '0.5rem' }}>3</td><td style={{ padding: '0.5rem' }}>6</td><td style={{ padding: '0.5rem' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH2</td><td style={{ padding: '0.5rem' }}>12</td><td style={{ padding: '0.5rem' }}>8</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH3</td><td style={{ padding: '0.5rem' }}>5</td><td style={{ padding: '0.5rem' }}>3</td><td style={{ padding: '0.5rem' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH4</td><td style={{ padding: '0.5rem' }}>9</td><td style={{ padding: '0.5rem' }}>7</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH5</td><td style={{ padding: '0.5rem' }}>2</td><td style={{ padding: '0.5rem' }}>8</td><td style={{ padding: '0.5rem' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH6</td><td style={{ padding: '0.5rem' }}>14</td><td style={{ padding: '0.5rem' }}>4</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
            </tbody>
          </table>
          <p>Một khách hàng mới M có thông tin: M = (Months = 7, Weekly_Hours = 6).</p>
          <p><strong>Yêu cầu:</strong></p>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: 0 }}>
            <li><strong>Tiền xử lý dữ liệu (Min-Max Scaling):</strong> Hãy chuẩn hóa toàn bộ dữ liệu của 6 khách hàng cũ và khách hàng mới M về đoạn [0, 1] bằng phương pháp Min-Max.</li>
            <li><strong>Tính toán khoảng cách:</strong> Tính khoảng cách Euclidean từ khách hàng M (sau khi chuẩn hóa) đến 6 khách hàng trong tập huấn luyện (sau khi chuẩn hóa).</li>
            <li><strong>Phân lớp:</strong> Tiến hành dự đoán nhãn VIP_Renewal cho khách hàng M trong hai trường hợp: Với k = 3 và Với k = 5.</li>
          </ol>
        </div>

        <h4>BÀI GIẢI NHANH (Trình bày ra giấy)</h4>
        
        <div style={solutionBlock}>
          <p><strong>1. Tiền xử lý dữ liệu (Min-Max Scaling)</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>Khách hàng mới M = (7, 6)</li>
            <li>• Thuộc tính Months: <span style={codeStyle}>Min = 2, Max = 14</span> → Chuẩn hóa M_Months = (7 - 2) / (14 - 2) = 5 / 12 ≈ <strong>0.4167</strong></li>
            <li>• Thuộc tính Weekly_Hours: <span style={codeStyle}>Min = 3, Max = 8</span> → Chuẩn hóa M_Weekly = (6 - 3) / (8 - 3) = 3 / 5 = <strong>0.6</strong></li>
            <li style={{ marginTop: '0.5rem', color: '#059669', fontWeight: '500' }}>→ M mới (sau chuẩn hóa) = (0.4167, 0.6)</li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>2. Tính toán khoảng cách (Euclidean)</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li><i>(Công thức: <span style={codeStyle}>d = √((x1 - x2)² + (y1 - y2)²)</span>)</i></li>
            <li>• KH1 (0.0833, 0.6): <span style={codeStyle}>d = √((0.4167 - 0.0833)² + (0.6 - 0.6)²) = 0.3333</span> → Hạng 2</li>
            <li>• KH2 (0.8333, 1.0): <span style={codeStyle}>d = √((0.4167 - 0.8333)² + (0.6 - 1.0)²) = 0.5776</span> → Hạng 3</li>
            <li>• KH3 (0.2500, 0.0): <span style={codeStyle}>d = √((0.4167 - 0.2500)² + (0.6 - 0.0)²) = 0.6227</span> → Hạng 5</li>
            <li>• KH4 (0.5833, 0.8): <span style={codeStyle}>d = √((0.4167 - 0.5833)² + (0.6 - 0.8)²) = 0.2603</span> → <strong>Hạng 1</strong> (Gần nhất)</li>
            <li>• KH5 (0.0000, 1.0): <span style={codeStyle}>d = √((0.4167 - 0.0000)² + (0.6 - 1.0)²) = 0.5776</span> → Hạng 4</li>
            <li>• KH6 (1.0000, 0.2): <span style={codeStyle}>d = √((0.4167 - 1.0000)² + (0.6 - 0.2)²) = 0.7073</span> → Hạng 6</li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>3. Phân lớp</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>• <strong>Với k = 3:</strong> 3 láng giềng gần nhất là KH4(Yes), KH1(No), KH2(Yes).<br/>→ Tỷ số: Yes(2) &gt; No(1). <strong>Kết luận: Yes</strong>.</li>
            <li>• <strong>Với k = 5:</strong> 5 láng giềng gần nhất là KH4(Yes), KH1(No), KH2(Yes), KH5(No), KH3(No).<br/>→ Tỷ số: No(3) &gt; Yes(2). <strong>Kết luận: No</strong>.</li>
          </ul>

          <details style={{ marginTop: '1.5rem', backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💡 Xem giải thích chi tiết Câu 1
            </summary>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
               <p><strong>1. Tại sao phải chuẩn hóa Min-Max Scaling?</strong><br/>Khoảng cách Euclidean rất nhạy cảm với sự chênh lệch đơn vị. Nếu cột <code>Months</code> có giá trị từ 1 đến 20, nhưng cột <code>Weekly_Hours</code> chỉ từ 1 đến 5, thì thuật toán sẽ bị "thiên vị" cột Months vì số của nó bự hơn. Chuẩn hóa Min-Max ép tất cả về khoảng từ 0 đến 1, giúp hai cột có tiếng nói ngang bằng nhau.</p>
               <p><strong>2. Công thức Min-Max là gì?</strong><br/><code>M_mới = (M - Min) / (Max - Min)</code>. Ở cột Months, bé nhất là 2 (KH5), lớn nhất là 14 (KH6). Vậy khách hàng M (có 7 tháng) sẽ được chuẩn hóa thành <code>(7 - 2) / (14 - 2) = 5 / 12 = 0.4167</code>.</p>
               <p><strong>3. Công thức Euclidean:</strong><br/><code>d = √((x1 - x2)² + (y1 - y2)²)</code>. Đây chính là định lý Pytago để tính khoảng cách đường chim bay. Bạn trừ 2 tọa độ tương ứng của M với từng khách hàng, bình phương, cộng lại rồi rút căn. Khoảng cách càng nhỏ thì càng "gần" (giống nhau).</p>
               <p><strong>4. Xác định Hạng như thế nào?</strong><br/>Sau khi tính khoảng cách từ M đến 6 KH, bạn sắp xếp khoảng cách từ NHỎ NHẤT đến LỚN NHẤT (0.2603 → 0.3333 → 0.5776 → 0.5776 → 0.6227 → 0.7073) để đánh hạng từ 1 đến 6. KH4 có khoảng cách nhỏ nhất nên xếp hạng 1 (Gần nhất).</p>
               <p><strong>5. Phân lớp (Voting):</strong><br/>- k=3: Chọn 3 người hạng cao nhất (Hạng 1, 2, 3), đếm xem Yes hay No nhiều hơn. Ở đây 3 người đó có nhãn là Yes, No, Yes → Số lượng Yes (2) &gt; No (1), nên M mang nhãn Yes.<br/>- k=5: Chọn 5 người hạng cao nhất, đếm xem Yes hay No nhiều hơn. Ở đây có 2 Yes, 3 No, nên M mang nhãn No.</p>
            </div>
          </details>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h3>Câu 2: Cây quyết định (Decision Tree)</h3>
        
        {/* ĐỀ BÀI CÂU 2 */}
        <div style={examBoxStyle}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>ĐỀ BÀI (2 ĐIỂM)</h4>
          <p>Sử dụng độ đo Information Gain (Độ lợi thông tin) để xây dựng cây quyết định dự đoán khả năng duyệt vay (Approved: Yes/No). Thuộc tính gồm Loại hợp đồng (Contract) và Lịch sử tín dụng (Credit_History).</p>
          <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '0.5rem' }}>Khách hàng</th>
                <th style={{ padding: '0.5rem' }}>Contract</th>
                <th style={{ padding: '0.5rem' }}>Credit_History</th>
                <th style={{ padding: '0.5rem' }}>Approved (Y)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '0.5rem' }}>KH1</td><td style={{ padding: '0.5rem' }}>Permanent</td><td style={{ padding: '0.5rem' }}>Good</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH2</td><td style={{ padding: '0.5rem' }}>Temporary</td><td style={{ padding: '0.5rem' }}>Bad</td><td style={{ padding: '0.5rem' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH3</td><td style={{ padding: '0.5rem' }}>Temporary</td><td style={{ padding: '0.5rem' }}>Good</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH4</td><td style={{ padding: '0.5rem' }}>Permanent</td><td style={{ padding: '0.5rem' }}>Bad</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH5</td><td style={{ padding: '0.5rem' }}>Temporary</td><td style={{ padding: '0.5rem' }}>Bad</td><td style={{ padding: '0.5rem' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH6</td><td style={{ padding: '0.5rem' }}>Permanent</td><td style={{ padding: '0.5rem' }}>Good</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH7</td><td style={{ padding: '0.5rem' }}>Temporary</td><td style={{ padding: '0.5rem' }}>Bad</td><td style={{ padding: '0.5rem' }}>No</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>KH8</td><td style={{ padding: '0.5rem' }}>Permanent</td><td style={{ padding: '0.5rem' }}>Good</td><td style={{ padding: '0.5rem' }}>Yes</td></tr>
            </tbody>
          </table>
          <p><strong>Yêu cầu:</strong></p>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: 0 }}>
            <li>Tính Entropy của tập dữ liệu ban đầu S.</li>
            <li>Tính Information Gain cho hai thuộc tính: Gain(S, Contract) và Gain(S, Credit_History).</li>
            <li>Xác định thuộc tính nào được chọn làm nút gốc và vẽ sơ đồ phân nhánh tại nút gốc đó.</li>
          </ol>
        </div>

        <h4>BÀI GIẢI NHANH (Trình bày ra giấy)</h4>
        
        <div style={solutionBlock}>
          <p><strong>1. Entropy tập S ban đầu</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>• Tập S có 8 mẫu: 5 Yes, 3 No</li>
            <li>• <span style={codeStyle}>Entropy(S) = -(5/8)*log2(5/8) - (3/8)*log2(3/8) = 0.9544</span></li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>2. Tính Information Gain</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li><strong>* Xét thuộc tính Contract:</strong></li>
            <li>• Nhánh Permanent: 4 mẫu (4 Yes, 0 No) → <span style={codeStyle}>Entropy = 0</span></li>
            <li>• Nhánh Temporary: 4 mẫu (1 Yes, 3 No) → <span style={codeStyle}>Entropy = -(1/4)*log2(1/4) - (3/4)*log2(3/4) = 0.8113</span></li>
            <li style={{ color: '#2563eb', fontWeight: '500' }}>→ Gain(Contract) = 0.9544 - [(4/8)*0 + (4/8)*0.8113] = 0.9544 - 0.40565 = 0.5488</li>
            
            <li style={{ marginTop: '1rem' }}><strong>* Xét thuộc tính Credit_History:</strong></li>
            <li>• Nhánh Good: 4 mẫu (4 Yes, 0 No) → <span style={codeStyle}>Entropy = 0</span></li>
            <li>• Nhánh Bad: 4 mẫu (1 Yes, 3 No) → <span style={codeStyle}>Entropy = -(1/4)*log2(1/4) - (3/4)*log2(3/4) = 0.8113</span></li>
            <li style={{ color: '#2563eb', fontWeight: '500' }}>→ Gain(Credit_History) = 0.9544 - [(4/8)*0 + (4/8)*0.8113] = 0.5488</li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>3. Chọn nút gốc & Sơ đồ nhánh</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>• Do Gain(Contract) = Gain(Credit_History) = 0.5488, ta có thể chọn thuộc tính nào cũng được. (Giả sử chọn <strong>Contract</strong> làm nút gốc).</li>
            <li style={{ marginTop: '1rem' }}>
              <strong>Sơ đồ phân nhánh:</strong>
              <div style={{ marginTop: '0.5rem', fontFamily: 'monospace', whiteSpace: 'pre', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                {`          [Contract]
             /    \\
  (Permanent)      (Temporary)
      /                \\
  [Yes] (4 Y, 0 N)    [?] (1 Y, 3 N)`}
              </div>
            </li>
          </ul>

          <details style={{ marginTop: '1.5rem', backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💡 Xem giải thích chi tiết Câu 2
            </summary>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
               <p><strong>1. Tại sao phải tính Entropy?</strong><br/>Entropy là thước đo sự "hỗn loạn" hay "không chắc chắn" của dữ liệu. Nếu tất cả khách hàng đều Approved=Yes (tinh khiết), Entropy = 0. Nếu 50% Yes và 50% No (cực kỳ lộn xộn), Entropy = 1.<br/>Công thức: <code>-p(Yes)*log2(p(Yes)) - p(No)*log2(p(No))</code>.</p>
               <p><strong>2. Tại sao dùng Information Gain (Độ lợi thông tin)?</strong><br/>Khi xây dựng Cây quyết định, thuật toán cần biết nên dùng cột nào để làm câu hỏi chia nhánh đầu tiên (Nút gốc). Cột nào giúp tách tập dữ liệu lộn xộn ban đầu thành các nhóm con "tinh khiết" (ít lộn xộn) nhất sẽ có Information Gain lớn nhất.<br/><code>Gain = Entropy(ban đầu) - Entropy(sau khi chia bằng thuộc tính đó)</code>.</p>
               <p><strong>3. Tại sao chọn Contract làm nút gốc?</strong><br/>Khi ta chia dữ liệu theo Contract, ta được nhánh Permanent gồm 4 mẫu đều là Yes (tinh khiết tuyệt đối, Entropy = 0). Nhánh Temporary thì lộn xộn hơn (1 Yes, 3 No). Nhờ nhánh Permanent sạch sẽ này, độ hỗn loạn tổng thể giảm đi rất nhiều, dẫn đến IG cao (0.5488). Vì 0.5488 lớn nên Contract là thuộc tính phân tách dữ liệu rất tốt.</p>
               <p><strong>4. Tại sao lại vẽ sơ đồ cây như thế kia?</strong><br/>Từ Nút gốc (Contract), ta có 2 giá trị là Permanent và Temporary nên chẻ ra 2 nhánh. Ở nhánh Permanent, vì có 4 Yes và 0 No, tập con này đã thuần nhất 100%, nên ta có thể đưa ra kết luận ngay (Lá = Yes). Nhánh Temporary còn lộn xộn (1 Yes, 3 No) nên phải ghi rõ tỷ lệ để nếu cây phát triển tiếp, thuật toán sẽ dựa vào nhóm này để phân nhánh ở tầng dưới.</p>
            </div>
          </details>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h3>Câu 3: Naive Bayes</h3>
        
        {/* ĐỀ BÀI CÂU 3 */}
        <div style={examBoxStyle}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>ĐỀ BÀI (2 ĐIỂM)</h4>
          <p>Mô hình Gaussian Naive Bayes phân loại ứng viên Hired (yes/no). Thuộc tính: Bằng cấp (Degree) và Điểm (Test_Score).</p>
          <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '0.5rem' }}>Ứng viên</th>
                <th style={{ padding: '0.5rem' }}>Degree</th>
                <th style={{ padding: '0.5rem' }}>Test_Score</th>
                <th style={{ padding: '0.5rem' }}>Hired (Y)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '0.5rem' }}>UV1</td><td style={{ padding: '0.5rem' }}>Bachelor</td><td style={{ padding: '0.5rem' }}>75</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>UV2</td><td style={{ padding: '0.5rem' }}>Master</td><td style={{ padding: '0.5rem' }}>85</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>UV3</td><td style={{ padding: '0.5rem' }}>Master</td><td style={{ padding: '0.5rem' }}>70</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>UV4</td><td style={{ padding: '0.5rem' }}>Bachelor</td><td style={{ padding: '0.5rem' }}>90</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>UV5</td><td style={{ padding: '0.5rem' }}>Bachelor</td><td style={{ padding: '0.5rem' }}>65</td><td style={{ padding: '0.5rem' }}>no</td></tr>
              <tr><td style={{ padding: '0.5rem' }}>UV6</td><td style={{ padding: '0.5rem' }}>Master</td><td style={{ padding: '0.5rem' }}>95</td><td style={{ padding: '0.5rem' }}>yes</td></tr>
            </tbody>
          </table>
          <p>Ứng viên mới N: N = (Degree = Master, Test_Score = 80).</p>
          <p><strong>Yêu cầu:</strong></p>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: 0 }}>
            <li><strong>Lập bảng thống kê tham số:</strong> Lập bảng thống kê chia làm hai phần rõ rệt (Tần số chữ và Tham số Mean/Std Dev số).</li>
            <li><strong>Tính toán độ khả dĩ (Likelihood):</strong> Sử dụng hàm mật độ xác suất Gauss, tính Likelihood(yes) và Likelihood(no) cho ứng viên N.</li>
            <li><strong>Kết luận:</strong> Chuẩn hóa giá trị về % và đưa ra phán quyết cuối cùng của mô hình.</li>
          </ol>
        </div>

        <h4>BÀI GIẢI NHANH (Trình bày ra giấy)</h4>
        
        <div style={solutionBlock}>
          <p><strong>1. Thống kê tham số</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>• Xác suất tiền nghiệm: <span style={codeStyle}>P(Yes) = 3/6 = 0.5</span> | <span style={codeStyle}>P(No) = 3/6 = 0.5</span></li>
            
            <li style={{ marginTop: '0.5rem' }}><strong>* Xét nhãn lớp YES:</strong></li>
            <li>• Xác suất Degree (Master): <span style={codeStyle}>P(Master|Yes) = 2/3</span></li>
            <li>• Test_Score (Mean μ): <span style={codeStyle}>μ_yes = (85 + 90 + 95) / 3 = 90</span></li>
            <li>• Test_Score (Std Dev σ): <span style={codeStyle}>σ_yes = √(((85-90)² + (90-90)² + (95-90)²) / 3) = √(50/3) ≈ 4.082</span></li>
            
            <li style={{ marginTop: '0.5rem' }}><strong>* Xét nhãn lớp NO:</strong></li>
            <li>• Xác suất Degree (Master): <span style={codeStyle}>P(Master|No) = 1/3</span></li>
            <li>• Test_Score (Mean μ): <span style={codeStyle}>μ_no = (75 + 70 + 65) / 3 = 70</span></li>
            <li>• Test_Score (Std Dev σ): <span style={codeStyle}>σ_no = √(((75-70)² + (70-70)² + (65-70)²) / 3) = √(50/3) ≈ 4.082</span></li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>2. Tính Likelihood cho ứng viên N(Master, 80)</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li><i>(Áp dụng hàm mật độ xác suất Gauss cho P(Test_Score=80))</i></li>
            <li>• <span style={codeStyle}>P(80|μ=90, σ=4.082) ≈ 0.00532</span></li>
            <li>• <span style={codeStyle}>P(80|μ=70, σ=4.082) ≈ 0.00532</span></li>
            <li style={{ marginTop: '0.5rem' }}>• <strong>Likelihood(Yes)</strong> = P(Yes) × P(Master|Yes) × P(80|Yes)<br/>   = (3/6) × (2/3) × 0.00532 = <strong>0.00177</strong></li>
            <li>• <strong>Likelihood(No)</strong> = P(No) × P(Master|No) × P(80|No)<br/>   = (3/6) × (1/3) × 0.00532 = <strong>0.00089</strong></li>
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>3. Kết luận</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1rem' }}>
            <li>Tổng = 0.00177 + 0.00089 = 0.00266</li>
            <li>• Xác suất Yes: 0.00177 / 0.00266 ≈ <strong>66.5%</strong></li>
            <li>• Xác suất No: 0.00089 / 0.00266 ≈ <strong>33.5%</strong></li>
            <li style={{ marginTop: '0.5rem', color: '#2563eb', fontWeight: 'bold' }}>→ Phán quyết: YES (Được tuyển dụng)</li>
          </ul>

          <details style={{ marginTop: '1.5rem', backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💡 Xem giải thích chi tiết Câu 3
            </summary>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
               <p><strong>1. Mô hình Gaussian Naive Bayes là gì?</strong><br/>Naive Bayes là thuật toán dựa trên xác suất. Chữ "Gaussian" nghĩa là với các cột dữ liệu là SỐ (như điểm Test_Score), thuật toán sẽ giả định dữ liệu tuân theo phân phối chuẩn (đường cong hình quả chuông). Do đó ta cần tính Giá trị trung bình (Mean μ) và Độ lệch chuẩn (Std Dev σ) để có thể áp dụng vào công thức hàm mật độ xác suất Gauss.</p>
               <p><strong>2. Tại sao lại phân ra hai nhóm YES và NO để tính riêng?</strong><br/>Bản chất của Naive Bayes là tự hỏi "Nếu kết quả là YES thì các đặc điểm (bằng cấp, điểm số) của nhóm này trông như thế nào?" và ngược lại với NO. Do đó ta tách 3 người đậu (YES) thành 1 nhóm, 3 người rớt (NO) thành 1 nhóm, rồi lấy trung bình điểm của từng nhóm để phác họa ra 2 đường cong chuông riêng biệt.</p>
               <p><strong>3. Tính Likelihood (Độ khả dĩ) là tính cái gì?</strong><br/>Likelihood là xác suất tổng hợp. Ta nhân 3 thứ lại với nhau: (Tỷ lệ người đậu ban đầu) × (Tỷ lệ người có bằng Master trong nhóm đậu) × (Xác suất đạt 80 điểm nếu thuộc nhóm đậu). <br/><i>Ghi chú vui:</i> Do có 2 số (0.00532) giống hệt nhau ở dòng P(80) là vì 80 cách đều trung bình của nhóm đậu (90) và nhóm rớt (70) một khoảng đúng bằng 10 điểm, độ lệch chuẩn lại bằng nhau, nên tính ra độ cao trên 2 cái chuông là y chang nhau.</p>
               <p><strong>4. Tại sao lại phải chia cho Tổng ở bước cuối?</strong><br/>Hai con số Likelihood 0.00177 và 0.00089 rất bé và chưa phải là xác suất thực tế (tổng không bằng 1). Để dễ hiểu, ta quy đổi chúng về phần trăm bằng cách lấy từng số chia cho Tổng của cả hai (0.00266). Kết quả là 66.5% nghiêng về YES. Vì vậy phán quyết cuối cùng là YES.</p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};

export default SolutionDe1;
