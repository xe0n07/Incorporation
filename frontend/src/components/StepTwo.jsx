import { useState } from 'react'
import axios from 'axios'

function StepTwo({ company, onComplete }) {
  const [shareholders, setShareholders] = useState(
    Array(company.number_of_shareholders).fill(null).map(() => ({
      first_name: '', last_name: '', nationality: ''
    }))
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (index, field, value) => {
    const updated = [...shareholders]
    updated[index] = { ...updated[index], [field]: value }
    setShareholders(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    for (let i = 0; i < shareholders.length; i++) {
      const s = shareholders[i]
      if (!s.first_name || !s.last_name || !s.nationality)
        return setError(`Fill all fields for Shareholder ${i + 1}`)
    }
    try {
      setLoading(true)
      await axios.post(`http://localhost:5000/companies/${company.id}/shareholders`, { shareholders })
      onComplete()
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-up">
      <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f2233', marginBottom: '4px' }}>
        Shareholder Details
      </h2>
      {/* Company pill */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        background: '#e8f0f5', borderRadius: '999px', padding: '4px 12px',
        fontSize: '12px', fontWeight: 600, color: '#1a3a4a', marginBottom: '20px'
      }}>
        {company.name}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {shareholders.map((s, i) => (
          <div key={i} className="shareholder-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div className="shareholder-num">{i + 1}</div>
              <span style={{ fontWeight: 600, fontSize: '14px', color: '#0f2233' }}>
                Shareholder {i + 1}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">First Name</label>
                <input className="input" type="text" value={s.first_name}
                  onChange={(e) => handleChange(i, 'first_name', e.target.value)} placeholder="John" />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input className="input" type="text" value={s.last_name}
                  onChange={(e) => handleChange(i, 'last_name', e.target.value)} placeholder="Doe" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Nationality</label>
                <input className="input" type="text" value={s.nationality}
                  onChange={(e) => handleChange(i, 'nationality', e.target.value)} placeholder="e.g. Nepali" />
              </div>
            </div>
          </div>
        ))}

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-success" style={{ marginTop: '4px' }}>
          {loading ? <><span className="spinner" /> Submitting...</> : '✓ Complete Incorporation'}
        </button>
      </form>
    </div>
  )
}

export default StepTwo