import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import './Task1.css';

const Task1 = () => {
    const [fileData, setFileData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [fileName, setFileName] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); 

    const handleFileUpload = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setFileName(file.name); 

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
            setFileData(jsonData);
            setFilteredData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleClearFile = () => {
        setFileName(""); 
        setFileData(null); 
        setFilteredData(null);
    };

    const handleClearSearch = () => {
        setSearchQuery(""); 
        setFilteredData(fileData); 
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleFileUpload,
        accept: ".xlsx, .xls",
    });

    const handleFilter = (query) => {
        setSearchQuery(query); 

        if (fileData && query) {
            const result = fileData.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(query.toLowerCase())
                )
            );
            setFilteredData(result);
        } else {
            setFilteredData(fileData); 
        }
    };
    const isNoData = () => {
        return !filteredData || filteredData.length === 0;
    };

    return (
        <div>
            <h2>Task 1: Upload file Excel và truy vấn dữ liệu</h2>

            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Kéo thả file hoặc click để chọn file Excel</p>
            </div>

            {fileName && (
                <>
                    <p>Tên file đã tải lên: {fileName}</p>
                    <button
                        onClick={searchQuery ? handleClearSearch : handleClearFile}
                        className="clear-button"
                    >
                        {searchQuery ? "Xóa tìm kiếm" : "Xóa file"}
                    </button>
                </>
            )}

            <input
                type="text"
                placeholder="Nhập nội dung cần tìm kiếm"
                value={searchQuery}
                onChange={(e) => handleFilter(e.target.value)}
                className="search-input"
            />

            <div className="table-container">
                {isNoData() ? (
                    <p>Không có kết quả nào được tìm thấy.</p> 
                ) : (
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(filteredData[0] || {}).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Task1;
