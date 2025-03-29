const mockData = {
    totalTests: 15,
    passedTests: 12,
    failedTests: 3,
    tests: [
        { id: 1, name: 'Addition Test', status: 'passed' },
        { id: 2, name: 'Subtraction Test', status: 'passed' },
        { id: 3, name: 'Multiplication Test', status: 'failed' },
        { id: 4, name: 'Division Test', status: 'passed' },
        { id: 5, name: 'Square Root Test', status: 'failed' },
        { id: 6, name: 'Prime Check Test', status: 'passed' },
        { id: 7, name: 'Palindrome Test', status: 'failed' },
        { id: 8, name: 'String Length Test', status: 'passed' },
        { id: 9, name: 'Array Sorting Test', status: 'passed' },
        { id: 10, name: 'Factorial Test', status: 'passed' },
        // Add more test data as needed
    ],
};

export default function Page() {
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Unit Test Report</h1>

            <div className="flex justify-between mb-4">
                <div className="text-center">
                    <p className="text-xl font-semibold">Total Tests</p>
                    <p className="text-2xl">{mockData.totalTests}</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-semibold text-green-500">Passed</p>
                    <p className="text-2xl text-green-500">{mockData.passedTests}</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-semibold text-red-500">Failed</p>
                    <p className="text-2xl text-red-500">{mockData.failedTests}</p>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Test Details</h2>
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 border-b text-left">Test Name</th>
                        <th className="px-4 py-2 border-b text-left">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mockData.tests.map((test) => (
                        <tr key={test.id} className={test.status === 'failed' ? 'bg-red-100' : 'bg-green-100'}>
                            <td className="px-4 py-2 border-b">{test.name}</td>
                            <td className={`px-4 py-2 border-b ${test.status === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
                                {test.status === 'passed' ? 'Passed' : 'Failed'}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}