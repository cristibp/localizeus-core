package com.localizeus.core.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import com.localizeus.core.domain.enumeration.TransactionType;

/**
 * A DTO for the {@link com.localizeus.core.domain.Transaction} entity.
 */
public class TransactionDTO implements Serializable {
    
    private Long id;

    private Long amountInCents;

    private LocalDate date;

    private String status;

    private TransactionType type;


    private Long serviceSubscriptionId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmountInCents() {
        return amountInCents;
    }

    public void setAmountInCents(Long amountInCents) {
        this.amountInCents = amountInCents;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public Long getServiceSubscriptionId() {
        return serviceSubscriptionId;
    }

    public void setServiceSubscriptionId(Long serviceSubscriptionId) {
        this.serviceSubscriptionId = serviceSubscriptionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TransactionDTO)) {
            return false;
        }

        return id != null && id.equals(((TransactionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TransactionDTO{" +
            "id=" + getId() +
            ", amountInCents=" + getAmountInCents() +
            ", date='" + getDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", type='" + getType() + "'" +
            ", serviceSubscriptionId=" + getServiceSubscriptionId() +
            "}";
    }
}
