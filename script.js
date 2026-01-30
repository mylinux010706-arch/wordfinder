* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-title {
  color: white;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.container {
  width: 420px;
  background: white;
  padding: 20px;
  border-radius: 10px;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
}

#info {
  margin-top: 10px;
  font-size: 13px;
  color: #666;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 15px;
  max-height: 300px;
  overflow-y: auto;
}

li {
  padding: 8px;
  background: #f0f0f0;
  margin-bottom: 6px;
  border-radius: 4px;
}
