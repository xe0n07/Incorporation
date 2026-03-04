import { useState, useEffect } from 'react'
import axios from 'axios'

function AdminPage() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/companies')
      .then(res => setCompanies(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="grid-bg min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" style={{ borderColor: 'rgba(26,58,74,0.2)', borderTopColor: '#1a3a4a', width: '28px', height: '28px' }} />
    </div>
  )

  return (
    <div className="grid-bg min-h-screen py-12 px-4">
      {/* Header */}
      <div style={{ maxWidth: '860px', margin: '0 auto 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontWeight: 800, fontSize: '20px', color: '#0f2233' }}>IncorpFlow</span>
          <span style={{ marginLeft: '10px', fontSize: '13px', color: '#6b8a9a', fontWeight: 500 }}>Admin Panel</span>
        </div>
        <a href="/" className="btn btn-primary" style={{ width: 'auto', padding: '8px 16px', fontSize: '13px', textDecoration: 'none' }}>
          + New Incorporation
        </a>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
          {[
            { label: 'Total Companies', value: companies.length },
            { label: 'Completed', value: companies.filter(c => c.status === 'complete').length },
            { label: 'Drafts', value: companies.filter(c => c.status === 'draft').length },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f2233' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#6b8a9a', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {companies.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px', color: '#8aa0b0' }}>
            No companies incorporated yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {companies.map(company => (
              <div key={company.id} className="card fade-up">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f2233', marginBottom: '6px' }}>
                      {company.name}
                    </h2>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b8a9a', flexWrap: 'wrap' }}>
                      <span>💰 ${Number(company.total_capital).toLocaleString()}</span>
                      <span>👥 {company.number_of_shareholders} shareholders</span>
                      <span className={`badge ${company.status}`}>{company.status}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#a0b0bf' }}>
                    {new Date(company.created_at).toLocaleDateString()}
                  </span>
                </div>

                {company.shareholders?.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>#</th><th>First Name</th><th>Last Name</th><th>Nationality</th>
                      </tr>
                    </thead>
                    <tbody>
                      {company.shareholders.map((s, i) => (
                        <tr key={s.id}>
                          <td style={{ color: '#a0b0bf' }}>{i + 1}</td>
                          <td>{s.first_name}</td>
                          <td>{s.last_name}</td>
                          <td>{s.nationality}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ fontSize: '13px', color: '#a0b0bf', fontStyle: 'italic' }}>
                    No shareholders added yet — draft in progress
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage