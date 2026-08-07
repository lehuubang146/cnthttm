const fs = require('fs');

const questions = [];
let idCounter = 1;

function addQ(question, options, answer, explanation) {
  questions.push({
    id: idCounter++,
    question,
    options,
    answer,
    explanation
  });
}

// 1. Tiền xử lý dữ liệu (Min-Max, Z-score) (40 câu)
for (let i = 0; i < 10; i++) {
  const min = Math.floor(Math.random() * 10);
  const max = min + 10 + Math.floor(Math.random() * 20);
  const val = min + Math.floor(Math.random() * (max - min));
  const res = ((val - min) / (max - min)).toFixed(2);
  addQ(
    `Cho một tập dữ liệu có giá trị nhỏ nhất của thuộc tính A là ${min} và lớn nhất là ${max}. Nếu sử dụng Min-Max Scaling để đưa về đoạn [0, 1], giá trị ${val} sẽ được chuẩn hóa thành bao nhiêu?`,
    [`${res}`, `${(res - 0.1).toFixed(2)}`, `${(parseFloat(res) + 0.1).toFixed(2)}`, `${(val / max).toFixed(2)}`],
    0,
    `Công thức Min-Max Scaling: x' = (x - min) / (max - min) = (${val} - ${min}) / (${max} - ${min}) = ${res}.`
  );
}

const pp_concepts = [
  { q: "Mục đích chính của Min-Max Scaling là gì?", opts: ["Đưa dữ liệu về cùng một thang đo [0, 1] hoặc [-1, 1]", "Loại bỏ các giá trị ngoại lai (outliers)", "Biến đổi phân phối dữ liệu thành phân phối chuẩn", "Chuyển kiểu dữ liệu chữ thành số"], ans: 0, exp: "Min-Max Scaling giúp đưa các thuộc tính có thang đo khác nhau về cùng một miền giá trị cố định, thường là [0, 1]." },
  { q: "Thuật toán nào sau đây nhạy cảm nhất với việc không chuẩn hóa dữ liệu?", opts: ["k-Nearest Neighbors (kNN)", "Decision Tree (Cây quyết định)", "Naive Bayes", "Random Forest"], ans: 0, exp: "kNN tính toán dựa trên khoảng cách (Euclidean/Manhattan) giữa các điểm, do đó nếu không chuẩn hóa, các thuộc tính có miền giá trị lớn sẽ áp đảo kết quả." },
  { q: "Thuật toán Cây quyết định (Decision Tree) có cần chuẩn hóa dữ liệu đầu vào (ví dụ Min-Max Scaling) không?", opts: ["Không cần thiết", "Bắt buộc phải có", "Chỉ cần khi dữ liệu có số âm", "Chỉ cần khi phân loại văn bản"], ans: 0, exp: "Cây quyết định hoạt động dựa trên việc chia rẽ nhánh bằng cách so sánh giá trị (>, <) nên không bị ảnh hưởng bởi thang đo, do đó không cần chuẩn hóa dữ liệu." },
  { q: "Z-score Standardization (Chuẩn hóa Z-score) đưa dữ liệu về đặc điểm nào?", opts: ["Kỳ vọng (Mean) = 0 và Độ lệch chuẩn (Std Dev) = 1", "Giá trị nằm trong đoạn [0, 1]", "Giá trị nằm trong đoạn [-1, 1]", "Trung vị (Median) = 0"], ans: 0, exp: "Chuẩn hóa Z-score (hay Standard Scaler) tính theo công thức z = (x - mean) / std, giúp phân phối dữ liệu có kỳ vọng bằng 0 và độ lệch chuẩn bằng 1." },
  { q: "Làm thế nào để xử lý dữ liệu bị thiếu (Missing Values) cho thuộc tính dạng số?", opts: ["Điền bằng giá trị trung bình (Mean) hoặc trung vị (Median)", "Thay bằng giá trị ngẫu nhiên", "Luôn xóa bỏ các dòng có dữ liệu thiếu", "Biến đổi thành 0 và 1"], ans: 0, exp: "Phương pháp phổ biến nhất để xử lý dữ liệu thiếu cho thuộc tính số học là điền giá trị Mean hoặc Median." },
];

for (let i = 0; i < 6; i++) {
  pp_concepts.forEach(c => addQ(c.q, c.opts, c.ans, c.exp));
}

// 2. K-Nearest Neighbors (kNN) (40 câu)
const knn_concepts = [
  { q: "Khoảng cách Manhattan giữa hai điểm A(x1, y1) và B(x2, y2) được tính bằng công thức nào?", opts: ["|x1 - x2| + |y1 - y2|", "sqrt((x1 - x2)^2 + (y1 - y2)^2)", "max(|x1 - x2|, |y1 - y2|)", "(x1*x2 + y1*y2)"], ans: 0, exp: "Khoảng cách Manhattan (City Block distance) là tổng giá trị tuyệt đối của hiệu các tọa độ: |x1 - x2| + |y1 - y2|." },
  { q: "Khoảng cách Euclidean giữa hai điểm A(x1, y1) và B(x2, y2) là:", opts: ["Căn bậc hai của ((x1 - x2)^2 + (y1 - y2)^2)", "|x1 - x2| + |y1 - y2|", "((x1 - x2) + (y1 - y2))^2", "x1*x2 + y1*y2"], ans: 0, exp: "Khoảng cách Euclidean đo độ dài đường thẳng trực tiếp giữa 2 điểm, dùng định lý Pytago." },
  { q: "Trong thuật toán kNN, k đại diện cho điều gì?", opts: ["Số lượng láng giềng gần nhất được xét", "Số lần lặp của thuật toán", "Số cụm dữ liệu phân chia", "Số chiều của không gian đặc trưng"], ans: 0, exp: "Chữ k trong kNN viết tắt cho k-Nearest Neighbors, tức là xét k hàng xóm gần nhất để bỏ phiếu đưa ra dự đoán." },
  { q: "Việc chọn k = 1 trong thuật toán kNN có thể dẫn đến hiện tượng gì?", opts: ["Overfitting (Quá khớp)", "Underfitting (Chưa khớp)", "High Bias", "Thuật toán chạy chậm nhất"], ans: 0, exp: "Khi k=1, mô hình trở nên quá nhạy cảm với nhiễu (noise) của từng điểm dữ liệu học, dẫn đến hiện tượng Overfitting." },
  { q: "kNN thuộc nhóm thuật toán học máy nào?", opts: ["Học có giám sát (Supervised Learning) - Lazy Learning", "Học không giám sát (Unsupervised Learning)", "Học tăng cường (Reinforcement Learning)", "Eager Learning (Học háo hức)"], ans: 0, exp: "kNN là thuật toán học có giám sát dựa trên khoảng cách. Được gọi là Lazy Learning vì nó không xây dựng một mô hình toán học khái quát mà chỉ lưu trữ lại toàn bộ tập huấn luyện." },
];

for (let i = 0; i < 6; i++) {
  knn_concepts.forEach(c => addQ(c.q, c.opts, c.ans, c.exp));
}

for (let i = 0; i < 10; i++) {
  const dx = Math.floor(Math.random() * 10) + 1;
  const dy = Math.floor(Math.random() * 10) + 1;
  const manhattan = dx + dy;
  const euclidean = Math.sqrt(dx*dx + dy*dy).toFixed(2);
  addQ(
    `Khoảng cách Manhattan giữa điểm P(0, 0) và Q(${dx}, ${dy}) là bao nhiêu?`,
    [`${manhattan}`, `${euclidean}`, `${dx*dy}`, `${Math.max(dx, dy)}`],
    0,
    `Khoảng cách Manhattan = |${dx} - 0| + |${dy} - 0| = ${manhattan}.`
  );
}

// 3. Cây quyết định (Decision Tree, Entropy, Information Gain) (50 câu)
const dt_concepts = [
  { q: "Entropy của một tập dữ liệu đạt giá trị LỚN NHẤT khi nào?", opts: ["Khi số lượng mẫu của các lớp bằng nhau hoàn toàn", "Khi tập dữ liệu chỉ chứa mẫu của một lớp duy nhất", "Khi số lượng mẫu bằng 0", "Khi cây không thể phân nhánh được nữa"], ans: 0, exp: "Entropy đo lường sự hỗn loạn. Hỗn loạn lớn nhất (Entropy tối đa = 1 đối với bài toán nhị phân) khi tỷ lệ các lớp là 50/50." },
  { q: "Entropy của một tập dữ liệu đạt giá trị BẰNG 0 khi nào?", opts: ["Khi tập dữ liệu hoàn toàn tinh khiết (chỉ thuộc về 1 lớp)", "Khi tỷ lệ các lớp bằng nhau", "Khi không có thuộc tính nào để phân nhánh", "Khi có quá nhiều dữ liệu"], ans: 0, exp: "Khi tất cả các mẫu đều thuộc về duy nhất 1 lớp (tinh khiết), độ hỗn loạn bằng 0, Entropy(D) = 0." },
  { q: "Information Gain (Độ lợi thông tin) được tính như thế nào?", opts: ["Entropy(Cha) - Tổng Entropy(Con) có trọng số", "Tổng Entropy(Con) - Entropy(Cha)", "Entropy(Cha) * Entropy(Con)", "Gini(Cha) - Gini(Con)"], ans: 0, exp: "Độ lợi thông tin (IG) đánh giá mức độ giảm độ hỗn loạn: IG = Entropy của tập D ban đầu trừ đi phần kỳ vọng Entropy sau khi chia nhánh." },
  { q: "Trong thuật toán ID3 tạo Cây quyết định, thuộc tính nào sẽ được chọn làm Nút Gốc (Root Node)?", opts: ["Thuộc tính có Information Gain LỚN NHẤT", "Thuộc tính có Information Gain NHỎ NHẤT", "Thuộc tính có Entropy LỚN NHẤT", "Thuộc tính có ít giá trị phân biệt nhất"], ans: 0, exp: "Thuật toán sẽ tham lam chọn thuộc tính mang lại Độ lợi thông tin lớn nhất để chia nhanh nhất các tập thành tinh khiết." },
  { q: "Hiện tượng Overfitting trong Cây quyết định thường xảy ra do nguyên nhân nào?", opts: ["Cây phát triển quá sâu và chi tiết theo tập huấn luyện", "Cây quá nông", "Không chuẩn hóa dữ liệu", "Sử dụng sai công thức Entropy"], ans: 0, exp: "Nếu cây không bị cắt tỉa (pruning) và phát triển tối đa đến khi mọi nút lá đều tinh khiết, nó sẽ học luôn cả nhiễu của dữ liệu, gây ra Overfitting." },
  { q: "Kỹ thuật nào thường được dùng để chống Overfitting cho Cây quyết định?", opts: ["Cắt tỉa cây (Pruning)", "Chuẩn hóa dữ liệu Min-Max", "Sử dụng kNN thay thế", "Thêm các đặc trưng ngẫu nhiên"], ans: 0, exp: "Pruning (Cắt tỉa) gồm Pre-pruning (Dừng sớm việc xây cây) và Post-pruning (Xây xong rồi tỉa bớt nhánh con) để giảm độ phức tạp của cây." },
];

for (let i = 0; i < 7; i++) {
  dt_concepts.forEach(c => addQ(c.q, c.opts, c.ans, c.exp));
}

for (let i = 0; i < 8; i++) {
  const yes = Math.floor(Math.random() * 5) + 1;
  const total = yes * 2;
  const no = total - yes;
  addQ(
    `Một tập dữ liệu D có ${total} mẫu, trong đó ${yes} mẫu thuộc lớp YES và ${no} mẫu thuộc lớp NO. Giá trị Entropy(D) là bao nhiêu?`,
    ["1.0", "0.0", "0.5", "-1.0"],
    0,
    `Tỷ lệ là ${yes}/${total} (50%) cho mỗi lớp. Khi xác suất bằng nhau, độ hỗn loạn đạt tối đa nên Entropy = 1.`
  );
}

// 4. Naive Bayes (Gaussian, Định lý Bayes) (40 câu)
const nb_concepts = [
  { q: "Thuật toán Naive Bayes dựa trên định lý toán học nào?", opts: ["Định lý Bayes", "Định lý Pytago", "Định luật Số lớn", "Bất đẳng thức Markov"], ans: 0, exp: "Thuật toán Naive Bayes ứng dụng Định lý Bayes về xác suất có điều kiện P(A|B) = [P(B|A) * P(A)] / P(B)." },
  { q: "Chữ 'Naive' (Ngây thơ) trong Naive Bayes ngụ ý điều gì?", opts: ["Giả định các thuộc tính đầu vào là Độc lập có điều kiện với nhau", "Thuật toán này rất đơn giản để lập trình", "Thuật toán luôn đưa ra xác suất sai", "Nó chỉ dùng cho các bài toán dễ"], ans: 0, exp: "Mô hình này 'ngây thơ' giả định rằng sự xuất hiện của một thuộc tính không ảnh hưởng đến các thuộc tính khác khi đã biết nhãn (Độc lập có điều kiện)." },
  { q: "Khi gặp một giá trị thuộc tính chưa từng xuất hiện trong tập huấn luyện (Xác suất bằng 0), Naive Bayes sẽ gặp lỗi gì và cách khắc phục?", opts: ["Zero Probability / Khắc phục bằng Laplace Smoothing", "Overfitting / Khắc phục bằng Pruning", "Underfitting / Khắc phục bằng K-Fold", "Missing Value / Khắc phục bằng Mean"], ans: 0, exp: "Khi một xác suất bằng 0, do phép nhân nên toàn bộ likelihood bằng 0. Laplace Smoothing (+1 vào tử số) được dùng để giải quyết." },
  { q: "Gaussian Naive Bayes thường được áp dụng cho loại dữ liệu nào?", opts: ["Dữ liệu số thực liên tục (phân phối chuẩn)", "Dữ liệu dạng văn bản", "Dữ liệu nhị phân (0, 1)", "Dữ liệu phân loại (Categorical)"], ans: 0, exp: "Gaussian NB sử dụng hàm mật độ xác suất phân phối chuẩn (Gauss) để tính likelihood cho các thuộc tính mang giá trị số liên tục." },
  { q: "Công thức nào sau đây biểu diễn Định lý Bayes?", opts: ["P(C|X) = ( P(X|C) * P(C) ) / P(X)", "P(C|X) = P(X|C) / P(C)", "P(C|X) = P(C) * P(X)", "P(C|X) = P(X|C) + P(C)"], ans: 0, exp: "Theo định lý Bayes: Xác suất hậu nghiệm = (Likelihood * Xác suất tiên nghiệm) / Evidence." },
];

for (let i = 0; i < 8; i++) {
  nb_concepts.forEach(c => addQ(c.q, c.opts, c.ans, c.exp));
}

// 5. Đánh giá mô hình & Khái niệm ML chung (30 câu)
const eval_concepts = [
  { q: "Trong bài toán phân loại, Accuracy (Độ chính xác) được tính như thế nào?", opts: ["Số mẫu dự đoán đúng / Tổng số mẫu", "True Positive / (True Positive + False Positive)", "True Positive / (True Positive + False Negative)", "2 * (Precision * Recall) / (Precision + Recall)"], ans: 0, exp: "Accuracy là tỷ lệ các dự đoán đúng trên toàn bộ tập kiểm thử: (TP + TN) / (TP + TN + FP + FN)." },
  { q: "Chỉ số Recall (Độ phủ) mang ý nghĩa gì?", opts: ["Trong số những mẫu thực tế là Positive, mô hình dự đoán đúng bao nhiêu %", "Trong số những mẫu mô hình dự đoán là Positive, thực tế đúng bao nhiêu %", "Độ chính xác tổng thể", "Phần trăm dự đoán sai"], ans: 0, exp: "Recall (hay Sensitivity) = TP / (TP + FN). Đo lường khả năng tìm ra tất cả các mẫu dương tính thực tế." },
  { q: "Kỹ thuật K-Fold Cross-Validation dùng để làm gì?", opts: ["Đánh giá độ ổn định và giảm sai lệch khi chia tập train/test", "Tăng tốc độ huấn luyện mô hình", "Giảm chiều dữ liệu", "Chuẩn hóa dữ liệu về [0, 1]"], ans: 0, exp: "Cross-validation chia dữ liệu thành K phần, huấn luyện K lần luân phiên để đánh giá khả năng tổng quát hóa của mô hình tốt hơn." },
  { q: "Bài toán dự đoán giá nhà dựa trên diện tích thuộc nhóm bài toán nào?", opts: ["Hồi quy (Regression)", "Phân lớp (Classification)", "Gom cụm (Clustering)", "Khai phá luật kết hợp (Association Rules)"], ans: 0, exp: "Giá nhà là một biến số thực liên tục, do đó dự đoán giá nhà là bài toán Hồi quy (Regression)." },
  { q: "Bài toán dự đoán email là Spam hay Non-Spam thuộc nhóm bài toán nào?", opts: ["Phân lớp (Classification)", "Hồi quy (Regression)", "Gom cụm (Clustering)", "Học không giám sát"], ans: 0, exp: "Phân loại vào các nhãn rời rạc (Spam/Non-Spam) là bài toán Phân lớp." },
  { q: "Một Confusion Matrix (Ma trận nhầm lẫn) của bài toán phân loại nhị phân có kích thước là bao nhiêu?", opts: ["2x2", "3x3", "1x2", "Nhiều chiều tùy dữ liệu"], ans: 0, exp: "Bài toán nhị phân có 2 lớp (Positive, Negative) nên ma trận có kích thước 2x2 chứa TP, TN, FP, FN." },
];

for (let i = 0; i < 5; i++) {
  eval_concepts.forEach(c => addQ(c.q, c.opts, c.ans, c.exp));
}

// Shuffle elements to make it interesting
const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

// Fix answer indices (scramble options and fix answer index)
shuffledQuestions.forEach(q => {
  const correctOpt = q.options[q.answer];
  const opts = [...q.options];
  
  // Create unique options
  const uniqueOpts = [...new Set(opts)];
  while(uniqueOpts.length < 4) {
    uniqueOpts.push("Đáp án khác " + Math.random().toString(36).substr(2, 4));
  }
  
  const finalOpts = uniqueOpts.slice(0, 4).sort(() => 0.5 - Math.random());
  q.options = finalOpts;
  q.answer = finalOpts.indexOf(correctOpt);
});

fs.writeFileSync('c:/xampp/htdocs/project1_lehuubang/cnthttm_review/src/data/questions.json', JSON.stringify(shuffledQuestions, null, 2));

console.log('Generated ' + shuffledQuestions.length + ' questions.');
