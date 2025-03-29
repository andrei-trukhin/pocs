const mockData = {
    totalTests: 20,
    passedTests: 18,
    failedTests: 2,
    tests: [
        { id: 1, name: 'Login Test', status: 'passed' },
        { id: 2, name: 'Signup Test', status: 'passed' },
        { id: 3, name: 'Payment Test', status: 'failed' },
        { id: 4, name: 'Search Test', status: 'passed' },
        { id: 5, name: 'Checkout Test', status: 'failed' },
        // Add more test data as needed
    ],
};

export default function Page() {
    // Generate the page with mock data for visual testing report component
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">E2E Test Report</h1>

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